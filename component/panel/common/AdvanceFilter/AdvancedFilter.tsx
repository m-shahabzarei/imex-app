/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import api from "@/lib/api";
import Image from "next/image";
import Button from "@/component/ui/Button";
import jalaali from "jalaali-js"; 

// --- Constants ---
const ITEM_HEIGHT = 40;
const MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];
const YEARS = Array.from({ length: 10 }, (_, i) => 1400 + i);

const TYPE_LABELS: Record<string, string> = {
  "export": "صادرات",
  "import": "واردات",
  "all": "همه"
};

// --- Types ---
export interface FilterItem {
  id: number | string;
  name?: string;
  title?: string;
  code?: string;
  value?: string;
  season?: { name: string };
  [key: string]: any;
}

interface DateRange {
  startYear: number;
  startMonth: number;
  endYear: number;
  endMonth: number;
}

interface FilterState {
  [key: string]: FilterItem | DateRange | null;
}

interface AdvancedFilterProps {
  onApply: (queryString: string) => void;
  hiddenFields?: string[]; 
}

// --- Configuration ---
const FIELDS_CONFIG = [
  { key: "code", label: "شماره تعرفه", endpoint: "/book/tariff", valueKey: "code", type: "list" },
  { key: "type", label: "نوع", endpoint: "/book/statistics/type", valueKey: "id", type: "list" },
  { key: "country", label: "نام کشور", endpoint: "/core/country", valueKey: "id", type: "list" },
  { key: "customs_name", label: "نام گمرک", endpoint: "/core/customs-name", valueKey: "id", type: "list" },
  { key: "date", label: "تاریخ", endpoint: null, type: "custom_date" },
];

// --- Sub-Component: ScrollColumn ---
function ScrollColumn<T extends string | number>({
  items,
  selected,
  onSelect,
}: {
  items: T[];
  selected: T;
  onSelect: (v: T) => void;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const index = items.indexOf(selected);
    if (index !== -1 && ref.current) {
      ref.current.scrollTop = index * ITEM_HEIGHT;
      setActive(index);
    }
  }, [selected, items]);

  const handleScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / ITEM_HEIGHT);
    if (index !== active && index >= 0 && index < items.length) {
      setActive(index);
    }
  };

 const handleScrollEnd = (
  e: React.MouseEvent<HTMLUListElement> | React.TouchEvent<HTMLUListElement>
) => {
  const target = e.currentTarget; 
  const scrollTop = target.scrollTop;
  const index = Math.round(scrollTop / ITEM_HEIGHT);

  if (index >= 0 && index < items.length) {
    onSelect(items[index]);
    ref.current?.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: "smooth",
    });
  }
};


  return (
    <div className="flex-1 h-full overflow-hidden relative">
      <ul
        ref={ref}
        onScroll={handleScroll}
        onMouseUp={handleScrollEnd}
        onTouchEnd={handleScrollEnd}
        className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory py-[50px] [&::-webkit-scrollbar]:hidden scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, i) => (
          <li
            key={item}
            onClick={() => {
              onSelect(item);
              ref.current?.scrollTo({ top: i * ITEM_HEIGHT, behavior: 'smooth' });
            }}
            className={`h-[40px] flex items-center justify-center snap-center cursor-pointer transition-all duration-200 w-full 
              ${i === active ? 'text-xl font-bold text-black scale-110' : 'text-sm text-gray-400 font-medium'}`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Main Component ---
const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ onApply, hiddenFields = [] }) => {
  const [filters, setFilters] = useState<FilterState>({
    code: null, type: null, country: null, customs_name: null, date: null,
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [options, setOptions] = useState<FilterItem[]>([]);
  const [tempSelection, setTempSelection] = useState<any>(null);

  // Search & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const listContainerRef = useRef<HTMLDivElement>(null);

  // --- Date Logic Helper (Persian to Gregorian) ---
  const convertToGregorianString = (jy: number, jm: number, isEndOfMonth: boolean) => {
    let gy, gm, gd;

    if (isEndOfMonth) {
      // پیدا کردن روز آخر ماه شمسی
      const daysInMonth = jalaali.jalaaliMonthLength(jy, jm);
      const result = jalaali.toGregorian(jy, jm, daysInMonth);
      gy = result.gy; gm = result.gm; gd = result.gd;
    } else {
      // روز اول ماه شمسی
      const result = jalaali.toGregorian(jy, jm, 1);
      gy = result.gy; gm = result.gm; gd = result.gd;
    }

    const mm = String(gm).padStart(2, '0');
    const dd = String(gd).padStart(2, '0');
    return `${gy}-${mm}-${dd}`;
  };

  const buildQueryString = (currentFilters: FilterState) => {
    const params = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, item]) => {
      if (!item) return;
      const fieldConfig = FIELDS_CONFIG.find((f) => f.key === key);

      if (key === "date" && fieldConfig?.type === "custom_date") {
        const dateObj = item as DateRange;
        // تبدیل تاریخ شروع به اولین روز ماه میلادی معادل
        const afterDate = convertToGregorianString(dateObj.startYear, dateObj.startMonth, false);
        // تبدیل تاریخ پایان به آخرین روز ماه میلادی معادل
        const beforeDate = convertToGregorianString(dateObj.endYear, dateObj.endMonth, true);
        
        params.append("date_range_after", afterDate);
        params.append("date_range_before", beforeDate);
      } else {
        const listItem = item as FilterItem;
        const keyToSend = fieldConfig?.valueKey || "id";
        const value = listItem[keyToSend];
        if (value) params.append(key, String(value));
      }
    });
    return params.toString();
  };

  // --- Fetch Function ---
  const fetchOptions = useCallback(async (fieldKey: string, endpoint: string, pageNum: number, search: string) => {
    setLoading(true);
    const otherFilters = { ...filters };
    delete otherFilters[fieldKey]; 
    
    const currentQuery = buildQueryString(otherFilters);
    const cleanEndpoint = endpoint.endsWith("/") ? endpoint.slice(0, -1) : endpoint;

    let url = `${cleanEndpoint}/?${currentQuery}&page=${pageNum}`;
    if (search) url += `&search=${search}`;

    try {
      const response = await api.get(url);
      
      let newItems: FilterItem[] = [];
      let hasNext = false;

      if (Array.isArray(response.data) && typeof response.data[0] === 'string') {
        newItems = response.data.map((str: string) => ({
           id: str, 
           name: TYPE_LABELS[str] || str, 
        }));
        hasNext = false; 
      }
      else if (response.data.results && Array.isArray(response.data.results)) {
        newItems = response.data.results;
        hasNext = !!response.data.next;
      } 
      else if (Array.isArray(response.data)) {
        newItems = response.data;
        hasNext = false;
      }

      setOptions(prev => pageNum === 1 ? newItems : [...prev, ...newItems]);
      setHasMore(hasNext);

    } catch (error) {
      console.error("Error fetching options:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [filters]); 

  // --- Handlers ---
  const openFieldSelection = (fieldKey: string, endpoint: string | null) => {
    setActiveField(fieldKey);
    setSearchTerm("");
    
    if (listContainerRef.current) {
        listContainerRef.current.scrollTop = 0;
    }

    if (fieldKey === "date") {
      const today = jalaali.toJalaali(new Date());
      setTempSelection(filters.date || {
        startYear: today.jy, startMonth: 1,
        endYear: today.jy, endMonth: today.jm
      });
      setOptions([]); 
    } else {
      setTempSelection(filters[fieldKey] || null);
      if (endpoint) {
        setPage(1);
        setHasMore(true);
        setOptions([]);
      }
    }
  };

  // --- Infinite Scroll ---
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (hasMore && !loading && activeField) {
        const config = FIELDS_CONFIG.find((f) => f.key === activeField);
        if (config && config.endpoint) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchOptions(activeField, config.endpoint, nextPage, searchTerm);
        }
      }
    }
  };

  // --- Search & Initial Fetch Debounce ---
  useEffect(() => {
    if (!activeField || activeField === 'date') return;

    const delay = searchTerm === "" ? 0 : 500;

    const delayDebounceFn = setTimeout(() => {
      const config = FIELDS_CONFIG.find((f) => f.key === activeField);
      if (config?.endpoint) {
          setPage(1);
          setHasMore(true);
          if(listContainerRef.current) listContainerRef.current.scrollTop = 0;
          fetchOptions(activeField, config.endpoint, 1, searchTerm);
      }
    }, delay);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeField]);


  // --- Confirm & Clear ---
  const handleConfirm = () => {
    const newFilters = { ...filters, [activeField!]: tempSelection };
    if (activeField === "country") newFilters.customs_name = null;
    
    setFilters(newFilters);
    setActiveField(null);
    onApply(buildQueryString(newFilters));
  };

  const handleClearFilter = () => {
    setTempSelection(null);
    const newFilters = { ...filters, [activeField!]: null };
    setFilters(newFilters);
    setActiveField(null);
    onApply(buildQueryString(newFilters));
  };

  const renderFilterLabel = (field: typeof FIELDS_CONFIG[0]) => {
    const val = filters[field.key];
    if (!val) return "همه";
    
    if (field.key === "date") {
      const d = val as DateRange;
      return `${d.startYear}/${d.startMonth} تا ${d.endYear}/${d.endMonth}`;
    }
    
    const item = val as FilterItem;
    return item.name || item.title || item.code || "انتخاب شده";
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
      <div className="flex flex-col gap-3">
        {FIELDS_CONFIG
          .filter((field) => !hiddenFields.includes(field.key))
          .map((field) => (
          <div
            key={field.key}
            onClick={() => openFieldSelection(field.key, field.endpoint)}
            className="flex flex-row-reverse items-center justify-between bg-[#5764ef34] p-3 rounded-lg cursor-pointer hover:bg-[#8890f034] transition duration-200 border border-transparent hover:border-blue-300"
          >
            <div className="flex items-center text-blue-600 text-sm font-medium gap-2">
              <span className="truncate max-w-[150px] md:max-w-xs text-left" dir="ltr">{renderFilterLabel(field)}</span>
              <Image src="/image/Alt Arrow Left.svg" alt="arrow" width={20} height={20} className="opacity-70" />
            </div>
            <div className="text-blue-800 font-semibold text-sm md:text-base">{field.label}</div>
          </div>
        ))}
      </div>

      {/* Modal / Bottom Sheet */}
      {activeField && (
        <div className="fixed inset-0 z-2000 flex items-end md:items-center justify-center bg-black/40 backdrop-blur-xs transition-all">
          <div 
             className="bg-white md:w-1/2 max-md:w-full md:rounded-xl md:h-[80vh] max-md:max-h-[55vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-300"
             onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="flex flex-col items-center pt-4 pb-2 px-4 shrink-0 border-b border-gray-100">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-4 md:hidden"></div>
              <h4 className="text-blue-900 font-bold text-lg">
                {FIELDS_CONFIG.find(f => f.key === activeField)?.label}
              </h4>
            </div>

            {/* Content Area */}
            {activeField === 'date' ? (
              // --- Date Picker UI ---
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-8" dir="rtl">
                  <div className="relative">
                    <div className="text-center mb-4 text-blue-800 font-medium">از تاریخ</div>
                    <div className="relative flex h-[140px] bg-gray-50 rounded-xl overflow-hidden">
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[40px] bg-blue-100/30 border-t border-b border-blue-200 pointer-events-none z-10"></div>
                      <ScrollColumn items={MONTHS} selected={MONTHS[(tempSelection?.startMonth || 1) - 1]} onSelect={(m) => setTempSelection({...tempSelection, startMonth: MONTHS.indexOf(m as string)+1})} />
                      <ScrollColumn items={YEARS} selected={tempSelection?.startYear || 1400} onSelect={(y) => setTempSelection({...tempSelection, startYear: y})} />
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="text-center mb-4 text-blue-800 font-medium">تا تاریخ</div>
                    <div className="relative flex h-[140px] bg-gray-50 rounded-xl overflow-hidden">
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[40px] bg-blue-100/30 border-t border-b border-blue-200 pointer-events-none z-10"></div>
                      <ScrollColumn items={MONTHS} selected={MONTHS[(tempSelection?.endMonth || 12) - 1]} onSelect={(m) => setTempSelection({...tempSelection, endMonth: MONTHS.indexOf(m as string)+1})} />
                      <ScrollColumn items={YEARS} selected={tempSelection?.endYear || 1400} onSelect={(y) => setTempSelection({...tempSelection, endYear: y})} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // --- Normal List UI ---
              <>
                <div className="px-4 py-3 shrink-0">
                  <div className="bg-gray-100 rounded-xl flex items-center px-3 py-2 border border-transparent focus-within:border-blue-400 transition-colors">
                    <Image src="/image/search-normal.svg" width={20} height={20} alt="search" className="opacity-50 ml-2"/>
                     <input 
                        type="text"
                        placeholder="جستجو..."
                        className="bg-transparent border-none outline-none w-full text-right text-gray-700 placeholder-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                     />
                  </div>
                </div>

                <div 
                  ref={listContainerRef}
                  className="flex-1 overflow-y-auto px-4 min-h-0" 
                  onScroll={handleScroll}
                >
                  {loading && page === 1 ? (
                    <div className="flex flex-col justify-center items-center py-20 gap-3 text-gray-400">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm">در حال دریافت اطلاعات...</span>
                    </div>
                  ) : (
                    <ul className="space-y-1 pb-4">
                       {options.map((item, idx) => {
                           const isSelected = tempSelection && (
                               (item.id && tempSelection.id === item.id) || 
                               (item.code && tempSelection.code === item.code)
                           );
                           
                           return (
                             <li
                               key={`${item.id}-${idx}`}
                               // Toggle Logic:
                               onClick={() => setTempSelection(isSelected ? null : item)}
                               className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors border
                                 ${isSelected 
                                   ? 'bg-blue-50 border-blue-200' 
                                   : 'bg-white border-transparent hover:bg-gray-50 border-b-gray-100'}`}
                             >
                               <div className="flex flex-col">
                                 <span className={`text-sm ${isSelected ? 'text-blue-800 font-bold' : 'text-gray-700'}`}>
                                    {item.name || item.title || item.code}
                                 </span>
                                 {(item.code && item.name) && (
                                    <span className="text-xs text-gray-400 mt-1">{item.code}</span>
                                 )}
                               </div>

                               <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all
                                 ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'}`}>
                                 {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                               </div>
                             </li>
                           )
                       })}
                       
                       {options.length === 0 && !loading && (
                         <div className="text-center text-gray-400 mt-10 flex flex-col items-center">
                            <span>موردی یافت نشد</span>
                         </div>
                       )}

                       {loading && page > 1 && (
                         <li className="flex justify-center items-center p-4 text-gray-500 text-xs">
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin ml-2"></div>
                            درحال بارگذاری بیشتر...
                         </li>
                       )}
                    </ul>
                  )}
                </div>
              </>
            )}

            {/* Footer Buttons */}
            <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-3 pb-6 sm:pb-4 shrink-0 mt-auto rounded-b-2xl">
              <Button variant="glassy" onClick={handleClearFilter}>حذف فیلتر</Button>
              <Button variant="secondary" onClick={handleConfirm}>اعمال</Button>
            </div>
          </div>
          <div className="absolute inset-0 z-[-1]" onClick={() => setActiveField(null)}></div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilter;