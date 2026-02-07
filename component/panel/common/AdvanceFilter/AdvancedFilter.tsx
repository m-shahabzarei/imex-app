"use client";
import React, { useState, useEffect, useRef } from "react";
import api from "@/lib/api";
import Image from "next/image";
import Button from "@/component/ui/Button";

// --- Constants ---
const ITEM_HEIGHT = 40;
const MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];
const YEARS = Array.from({ length: 7 }, (_, i) => 1400 + i);

// دیکشنری ترجمه برای تایپ‌ها
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
}

// --- Configuration ---
const FIELDS_CONFIG = [
  { key: "code", label: "کد تعرفه", endpoint: "/book/tariff", valueKey: "code", type: "list" },
  { key: "type", label: "نوع", endpoint: "/book/statistics/type", valueKey: "id", type: "list" },
  { key: "country", label: "نام کشور", endpoint: "/core/country", valueKey: "id", type: "list" },
  { key: "customs_name", label: "نام گمرک", endpoint: "/core/customs-name", valueKey: "id", type: "list" },
  { key: "date", label: "تاریخ", endpoint: null, type: "custom_date" },
];

// --- Sub-Component: ScrollColumn (تاریخ) - اصلاح شده ---
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

  const handleScrollEnd = (e: any) => {
    const index = Math.round(e.target.scrollTop / ITEM_HEIGHT);
    if (index >= 0 && index < items.length) {
        setActive(index);
        onSelect(items[index]);
    }
  };

  return (
    <div className="flex-1 h-full overflow-hidden relative">
      <ul
        ref={ref}
        onScroll={(e) => {
             const index = Math.round(e.currentTarget.scrollTop / ITEM_HEIGHT);
             if (index !== active) setActive(index);
        }}
        onMouseUp={handleScrollEnd}
        onTouchEnd={handleScrollEnd}
        // تغییرات اینجاست: overflow-x-hidden و مخفی کردن اسکرول بار
        className="h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory py-[60px] [&::-webkit-scrollbar]:hidden"
        style={{ 
          scrollbarWidth: 'none',  /* Firefox */
          msOverflowStyle: 'none'  /* IE/Edge */
        }}
      >
        {items.map((item, i) => (
          <li
            key={item}
            onClick={() => {
              ref.current?.scrollTo({ top: i * ITEM_HEIGHT, behavior: 'smooth' });
              onSelect(item);
            }}
            className={`h-[40px] flex items-center justify-center snap-center cursor-pointer transition-all duration-200 w-full
              ${i === active ? 'text-2xl font-bold text-black scale-110' : 'text-sm text-gray-400 font-medium'}
            `}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Main Component ---
const AdvancedFilter: React.FC<AdvancedFilterProps> = ({ onApply }) => {
  const [filters, setFilters] = useState<FilterState>({
    code: null, type: null, country: null, customs_name: null, date: null,
  });

  const [activeField, setActiveField] = useState<string | null>(null);
  const [options, setOptions] = useState<FilterItem[]>([]);
  const [tempSelection, setTempSelection] = useState<any>(null);
  
  // Search & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const listContainerRef = useRef<HTMLDivElement>(null);

  // --- Logic Helpers ---
  const convertToApiDate = (year: number, month: number, isEnd: boolean) => {
    const m = month < 10 ? `0${month}` : month;
    const d = isEnd ? (month <= 6 ? 31 : (month === 12 ? 29 : 30)) : "01";
    return `${year}-${m}-${d}`; 
  };

  const buildQueryString = (currentFilters: FilterState) => {
    const params = new URLSearchParams();
    Object.entries(currentFilters).forEach(([key, item]) => {
      if (!item) return;
      const fieldConfig = FIELDS_CONFIG.find((f) => f.key === key);
      
      if (key === "date" && fieldConfig?.type === "custom_date") {
        const dateObj = item as DateRange;
        const afterDate = convertToApiDate(dateObj.startYear, dateObj.startMonth, false);
        const beforeDate = convertToApiDate(dateObj.endYear, dateObj.endMonth, true);
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

  // --- Handlers ---
  const openFieldSelection = (fieldKey: string, endpoint: string | null) => {
    setActiveField(fieldKey);
    setSearchTerm("");
    
    if (fieldKey === "date") {
      setTempSelection(filters.date || {
        startYear: 1404, startMonth: 11,
        endYear: 1404, endMonth: 11
      });
    } else {
      setTempSelection(filters[fieldKey] || null);
      if (endpoint) {
        setPage(1);
        setHasMore(true);
        setOptions([]);
        fetchOptions(fieldKey, endpoint, 1, ""); 
      }
    }
  };

  // --- Fetch Function ---
  const fetchOptions = async (fieldKey: string, endpoint: string, pageNum: number, search: string) => {
    setLoading(true);
    const currentQuery = buildQueryString(filters);
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
      console.error(error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // --- Infinite Scroll Handler ---
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (hasMore && !loading && activeField) {
        const config = FIELDS_CONFIG.find((f) => f.key === activeField);
        if (config && config.type !== 'custom_date' && config.endpoint) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchOptions(activeField, config.endpoint, nextPage, searchTerm);
        }
      }
    }
  };

  // --- Auto Load More Check ---
  useEffect(() => {
    if (!loading && hasMore && options.length > 0 && activeField && activeField !== 'date') {
        const container = listContainerRef.current;
        if (container && container.scrollHeight <= container.clientHeight) {
            const config = FIELDS_CONFIG.find((f) => f.key === activeField);
            if(config?.endpoint) {
                const nextPage = page + 1;
                setPage(nextPage);
                fetchOptions(activeField, config.endpoint, nextPage, searchTerm);
            }
        }
    }
  }, [options, loading, hasMore, activeField]);


  // --- Search Debounce Handler ---
  useEffect(() => {
    if (!activeField || activeField === 'date') return;
    if (page === 1 && searchTerm === "" && options.length === 0) return;

    const delayDebounceFn = setTimeout(() => {
      const config = FIELDS_CONFIG.find((f) => f.key === activeField);
      if (config?.endpoint) {
          setPage(1);
          setHasMore(true);
          fetchOptions(activeField, config.endpoint, 1, searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);


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
      <h1 className="w-full text-custom font-bold text-lg mb-4">آمار صادرات و واردات</h1>

      <div className="flex flex-col gap-3">
        {FIELDS_CONFIG.map((field) => (
          <div
            key={field.key}
            onClick={() => openFieldSelection(field.key, field.endpoint)}
            className="flex flex-row-reverse items-center opacity-90 justify-between bg-[#5764ef34] p-3 rounded-lg cursor-pointer hover:bg-blue-100 transition duration-200"
          >
            <div className="flex items-center text-blue-600 text-sm font-medium">
              <span>{renderFilterLabel(field)}</span>
               <Image src="/image/Alt Arrow Left.svg" alt="left arrow " width={22} height={26}  />
            </div>
            <div className="text-blue-800 font-semibold">{field.label}</div>
          </div>
        ))}
      </div>

      {activeField && (
        <div className="fixed inset-0 z-5000 flex items-end md:items-center justify-center bg-black/40">
          <div className="bg-white md:w-1/2 max-md:w-full md:rounded-xl md:h-[80vh] max-md:max-h-[55vh] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
            
            <div className="flex flex-col items-center pt-3 pb-2 px-4 shrink-0">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-4"></div>
              <h4 className="text-blue-800 font-bold text-lg">
                {FIELDS_CONFIG.find(f => f.key === activeField)?.label}
              </h4>
            </div>

            {/* Content Area */}
            {activeField === 'date' ? (
              // --- Date Picker UI ---
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-10" dir="rtl">
                  <div className="relative">
                    <div className="text-center mb-6 text-gray-600 text-lg">از تاریخ</div>
                    <div className="relative flex h-[160px]">
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[40px] border-t border-b border-gray-200 pointer-events-none z-10"></div>
                      <ScrollColumn items={MONTHS} selected={MONTHS[(tempSelection?.startMonth || 11) - 1]} onSelect={(m) => setTempSelection({...tempSelection, startMonth: MONTHS.indexOf(m as string)+1})} />
                      <ScrollColumn items={YEARS} selected={tempSelection?.startYear || 1404} onSelect={(y) => setTempSelection({...tempSelection, startYear: y})} />
                    </div>
                  </div>
                  <div className="border-t border-gray-100 mx-10"></div>
                  <div className="relative">
                    <div className="text-center text-gray-600 mb-6 text-lg">تا تاریخ</div>
                    <div className="relative flex h-[160px]">
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[40px] border-t border-b border-gray-200 pointer-events-none z-10"></div>
                      <ScrollColumn items={MONTHS} selected={MONTHS[(tempSelection?.endMonth || 11) - 1]} onSelect={(m) => setTempSelection({...tempSelection, endMonth: MONTHS.indexOf(m as string)+1})} />
                      <ScrollColumn items={YEARS} selected={tempSelection?.endYear || 1404} onSelect={(y) => setTempSelection({...tempSelection, endYear: y})} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // --- Normal List UI ---
              <>
                <div className="px-4 mb-2 shrink-0">
                  <div className="bg-gray-100 rounded-xl flex items-center px-3 py-3">
                    <Image src="/image/search-normal.svg" width={22} height={22} alt="search icon" className="invert brightness-34 ml-2"/>
                     <input 
                        type="text"
                        placeholder="جستجو..."
                        className="bg-transparent border-none outline-none w-full text-right text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                     />
                  </div>
                </div>

                <div 
                  ref={listContainerRef}
                  className="flex-1 overflow-y-auto px-4 py-2 min-h-0" 
                  onScroll={handleScroll}
                >
                  {loading && page === 1 ? (
                    <div className="flex justify-center items-center py-10 gap-2 text-gray-400">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span>در حال دریافت...</span>
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
                               onClick={() => setTempSelection(item)}
                               className="flex items-center justify-between p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50"
                             >
                               <span className="text-gray-800">
                                  {item.name || item.title || item.code}
                                  {item.code && item.season?.name ? ` - ${item.season.name}` : ""}
                               </span>
                               <div className={`w-6 h-6 rounded border-2 flex items-center justify-center
                                 ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-200'}`}>
                                 {isSelected && <span className="text-white text-xs">✓</span>}
                               </div>
                             </li>
                           )
                       })}
                       
                       {options.length === 0 && !loading && (
                         <li className="text-center text-gray-400 mt-4">موردی یافت نشد</li>
                       )}

                       {loading && page > 1 && (
                         <li className="flex justify-center items-center p-3 gap-2 text-gray-500 text-sm">
                            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            درحال دریافت بیشتر...
                         </li>
                       )}
                    </ul>
                  )}
                </div>
              </>
            )}

            <div className="p-4 bg-white border-t border-gray-100 grid grid-cols-2 gap-3 pb-6 sm:pb-4 shrink-0 mt-auto md:rounded-xl">
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