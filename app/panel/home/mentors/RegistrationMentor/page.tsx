"use client";

import api from "@/lib/api";
import { useEffect, useRef, useState } from "react";
import { Trash2 } from "lucide-react";

/* ================= TYPES ================= */

interface Option {
  id: number;
  name: string;
}

interface ScheduleRange {
  from: string;
  to: string;
}

type ScheduleState = {
  [day: string]: ScheduleRange[];
};

const days = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنج شنبه",
  "جمعه",
];

/* ================= PAGE ================= */

export default function ConsultantRegisterPage() {
  /* ---------- Form State ---------- */
  const [fullName, setFullName] = useState("");
  const [nationalCode, setNationalCode] = useState("");
  const [education, setEducation] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");

  /* ---------- Dropdown Data ---------- */
  const [productGroups, setProductGroups] = useState<Option[]>([]);
  const [countries, setCountries] = useState<Option[]>([]);
  const [processes, setProcesses] = useState<Option[]>([]);

  /* ---------- Selected Values ---------- */
  const [selectedGroup, setSelectedGroup] = useState<Option | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Option | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<Option | null>(null);

  /* ---------- Activity Type ---------- */
  const [isInPerson, setIsInPerson] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  /* ---------- Schedule ---------- */
  const [inPersonSchedule, setInPersonSchedule] = useState<ScheduleState>({});
  const [onlineSchedule, setOnlineSchedule] = useState<ScheduleState>({});

  /* ---------- Resume ---------- */
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  /* ---------- Status ---------- */
  const [loading, setLoading] = useState(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productGroupsRes, countriesRes, processesRes] =
          await Promise.all([
            api.get("https://api.imexapp.ir/users/consultant-product-groups/"),
            api.get("https://api.imexapp.ir/core/country/"),
            api.get("https://api.imexapp.ir/users/consultant-processes/"),
          ]);

        const normalizedGroups =
          productGroupsRes.data?.results?.map((item: any) => ({
            id: item.id,
            name: item.title,
          })) || [];

        const normalizedProcesses =
          processesRes.data?.results?.map((item: any) => ({
            id: item.id,
            name: item.title,
          })) || [];

        const normalizedCountries =
          countriesRes.data?.results || countriesRes.data;

        setProductGroups(normalizedGroups);
        setCountries(normalizedCountries);
        setProcesses(normalizedProcesses);
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };

    fetchData();
  }, []);

  /* ================= SUBMIT ================= */
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!selectedGroup || !selectedCountry || !selectedProcess) {
    alert("لطفا تمام فیلدهای انتخابی را پر کنید.");
    return;
  }

  if (!isInPerson && !isOnline) {
    alert("حداقل یک نوع فعالیت را انتخاب کنید.");
    return;
  }

  setLoading(true);

  try {
    const buildWorkingDays = (schedule: ScheduleState) => {
      return Object.keys(schedule).map((day) => ({
        day_of_week: days.indexOf(day), 
        is_active: true,
      }));
    };

    let type = "";
    if (isInPerson && isOnline) type = "both";
    else if (isOnline) type = "online";
    else if (isInPerson) type = "offline";

    const payload = {
      full_name: fullName,
      national_code: nationalCode,
      education,
      age,
      country: String(selectedCountry.id),
      description,
      process: String(selectedProcess.id),
      product_group: String(selectedGroup.id),
      type,
      online_working_days: isOnline
        ? buildWorkingDays(onlineSchedule)
        : [],
      offline_working_days: isInPerson
        ? buildWorkingDays(inPersonSchedule)
        : [],
    };

    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    });

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    await api.post(
      "/users/consultants/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

  } catch (error) {
    console.error("Submit error:", error);
  } finally {
    setLoading(false);
  }
};


  /* ================= UI ================= */

  return (
    <div className="min-h-screen flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-6xl rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.12)] p-6 md:p-10"
      >
        <h1 className="text-xl font-bold text-gray-700 mb-8">
          فرم ثبت نام مشاور
        </h1>

        {/* ============ ROW 1 ============ */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Input 
            label="نام و نام خانوادگی" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
          />
          <Input 
            label="کد ملی" 
            value={nationalCode} 
            onChange={(e) => setNationalCode(e.target.value)} 
          />
          <Input 
            label="تحصیلات" 
            value={education} 
            onChange={(e) => setEducation(e.target.value)} 
          />
          <Input 
            label="سن" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            type="number"
          />

          <CustomSelect
            label="گروه کالا"
            options={productGroups}
            selected={selectedGroup}
            setSelected={setSelectedGroup}
          />

          <CustomSelect
            label="کشور"
            options={countries}
            selected={selectedCountry}
            setSelected={setSelectedCountry}
          />

          <CustomSelect
            label="فرایند"
            options={processes}
            selected={selectedProcess}
            setSelected={setSelectedProcess}
          />

          {/* ============ FILE UPLOAD ============ */}

          <div className="mb-8">
            <label className="block text-sm text-gray-600 mb-2">
              بارگذاری فایل رزومه
            </label>

            <label className="flex items-center justify-center w-full md:w-72 bg-[#e9e9f8] text-[#5b5fc7] rounded-xl py-3 cursor-pointer hover:opacity-90 transition">
              {resumeFile ? "تغییر فایل" : "انتخاب فایل"}
              <input
                type="file"
                hidden
                onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
              />
            </label>

            {resumeFile && (
              <p className="text-sm text-gray-500 mt-2">{resumeFile.name}</p>
            )}
          </div>
        </div>

        {/* ============ ACTIVITY TYPE ============ */}

        <div className="mb-6">
          <label className="font-medium text-gray-700 mb-3 block">
            نوع فعالیت
          </label>

          <div className="flex gap-6">
            <Checkbox
              label="حضوری"
              checked={isInPerson}
              onChange={() => setIsInPerson(!isInPerson)}
            />
            <Checkbox
              label="مجازی"
              checked={isOnline}
              onChange={() => setIsOnline(!isOnline)}
            />
          </div>
        </div>

        <div>
          {isInPerson && (
            <ScheduleSection
              title="بازه‌های زمانی پیشنهادی جهت مشاوره حضوری"
              schedule={inPersonSchedule}
              setSchedule={setInPersonSchedule}
            />
          )}

          {isOnline && (
            <ScheduleSection
              title="بازه‌های زمانی پیشنهادی جهت مشاوره مجازی"
              schedule={onlineSchedule}
              setSchedule={setOnlineSchedule}
            />
          )}
        </div>

        {/* ============ DESCRIPTION ============ */}

        <div className="mt-8">
          <label className="block text-sm text-gray-600 mb-2">توضیحات</label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full bg-[#f4f4f6] rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#6e72d9] transition"
          />
        </div>

        {/* ============ SUBMIT ============ */}

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full md:w-60 bg-gradient-to-r from-[#6e72d9] to-[#5b5fc7] text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </form>
    </div>
  );
}

/* ================= COMPONENTS ================= */

// کامپوننت Input را آپدیت کردم تا مقادیر را دریافت کند
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input({ label, ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>
      <input 
        className="w-full bg-[#f4f4f6] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#6e72d9]" 
        {...props}
      />
    </div>
  );
}

// بقیه کامپوننت‌ها (CustomSelect, Checkbox, ScheduleSection) بدون تغییر می‌مانند
// فقط کد آن‌ها را برای کامل بودن اینجا قرار می‌دهم اگر نیاز بود کپی کنید

function CustomSelect({
  label,
  options,
  selected,
  setSelected,
}: {
  label: string;
  options: Option[];
  selected: Option | null;
  setSelected: (val: Option) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!ref.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm text-gray-600 mb-2">{label}</label>

      <div
        onClick={() => setOpen(!open)}
        className="bg-[#f4f4f6] rounded-xl px-4 py-3 cursor-pointer flex justify-between items-center"
      >
        <span className="truncate">{selected ? selected.name : "انتخاب کنید"}</span>
      </div>

      {open && (
        <div className="absolute z-20 bg-white shadow-lg rounded-xl w-full mt-2 max-h-60 overflow-auto border border-gray-100">
          {options.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelected(item);
                setOpen(false);
              }}
              className="px-4 py-3 hover:bg-[#f2f2f8] cursor-pointer text-sm"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Checkbox({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-[#6e72d9] w-4 h-4"
      />
      {label}
    </label>
  );
}

function ScheduleSection({
  title,
  schedule,
  setSchedule,
}: {
  title: string;
  schedule: ScheduleState;
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleState>>;
}) {
  const toggleDay = (day: string) => {
    if (schedule[day]) {
      const copy = { ...schedule };
      delete copy[day];
      setSchedule(copy);
    } else {
      setSchedule({
        ...schedule,
        [day]: [{ from: "08:00", to: "23:00" }],
      });
    }
  };

  const addRange = (day: string) => {
    const copy = { ...schedule };
    copy[day].push({ from: "", to: "" });
    setSchedule(copy);
  };

  const removeRange = (day: string, index: number) => {
    const copy = { ...schedule };
    copy[day] = copy[day].filter((_, i) => i !== index);
    if (copy[day].length === 0) delete copy[day];
    setSchedule(copy);
  };

  const updateTime = (
    day: string,
    index: number,
    field: "from" | "to",
    value: string
  ) => {
    const copy = { ...schedule };
    copy[day][index][field] = value;
    setSchedule(copy);
  };

  return (
    <div className="bg-[#f6f6fb] rounded-2xl p-6 mb-8">
      <h2 className="text-gray-800 font-medium mb-5">{title}</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => toggleDay(day)}
            className={`px-4 py-2 rounded-xl text-sm transition ${
              schedule[day]
                ? "bg-[#6e72d9] text-white"
                : "bg-white text-gray-600 border border-transparent hover:border-gray-300"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {Object.keys(schedule).map((day) => (
        <div
          key={day}
          className="mb-6 border-t border-t-gray-200 pt-4 first:border-t-0 first:pt-0"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gray-700">{day}</h3>
          </div>

          {schedule[day].map((range, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center gap-3 mb-3"
            >
              <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200">
                <input
                  type="time"
                  value={range.from}
                  onChange={(e) =>
                    updateTime(day, index, "from", e.target.value)
                  }
                  className="outline-none text-sm cursor-pointer"
                />
              </div>

              <span className="text-gray-500 text-sm hidden md:block">تا</span>

              <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-200">
                <input
                  type="time"
                  value={range.to}
                  onChange={(e) => updateTime(day, index, "to", e.target.value)}
                  className="outline-none text-sm cursor-pointer"
                />
              </div>

              <button
                type="button"
                onClick={() => removeRange(day, index)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addRange(day)}
            className="text-[#6e72d9] text-sm mt-2 font-medium hover:underline"
          >
            + افزودن بازه
          </button>
        </div>
      ))}
    </div>
  );
}