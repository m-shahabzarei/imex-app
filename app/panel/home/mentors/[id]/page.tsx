"use client";

import InfoBox from "@/component/panel/book/tariffs/InfoBox";
import { IData } from "@/component/panel/home/mentors/[id]/Type";
import Button from "@/component/ui/Button";
import LoadingSpinner from "@/component/ui/Loading";
import api from "@/lib/api";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams();

  const [data, setData] = useState<IData>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /* ================= Fetch Consultant ================= */

  useEffect(() => {
    if (!id) return;

    api
      .get(`https://api.imexapp.ir/users/consultants/${id}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= Form State ================= */

  const [formState, setFormState] = useState({
    job: "",
    position: "",
    product: "",
    sessionType: "", // online | offline
    businessCard: "", // yes | no
    personType: "", // real | legal
    fullName: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
    address: "",
    description: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* ================= Submit ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      setSubmitting(true);

      const start = new Date(`1970-01-01T${formState.startTime}:00`);
      const end = new Date(`1970-01-01T${formState.endTime}:00`);

      const duration =
        formState.startTime && formState.endTime
          ? Math.floor((end.getTime() - start.getTime()) / 60000)
          : 0;

      const payload = {
        job: formState.job,
        position: formState.position,
        product: formState.product,
        cart: formState.businessCard === "yes",
        person: formState.personType === "legal",
        consultant: String(id),
        full_name: formState.fullName,
        date_time: formState.date,
        address: formState.address,
        text: formState.description,
        type_request: formState.sessionType,
        time_slots: [
          {
            start_time: formState.startTime,
            end_time: formState.endTime,
            session_duration: duration,
            is_active: true,
          },
        ],
      };

      await api.post(
        "/users/consultant-request/",
        payload
      );

        window.location.href="/panel/home"
      // Reset Form
      setFormState({
        job: "",
        position: "",
        product: "",
        sessionType: "",
        businessCard: "",
        personType: "",
        fullName: "",
        phone: "",
        date: "",
        startTime: "",
        endTime: "",
        address: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
      alert("خطا در ثبت درخواست");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= UI ================= */

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-full flex flex-col items-end gap-8">
      {/* Top */}
      <div className="flex max-lg:flex-col gap-6 w-full h-fit justify-between">
        
        {/* Profile */}
        <div className="lg:w-3/5 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 ">
          
          <h1 className="text-custom font-bold">{data?.full_name}</h1>
          <div className="flex w-full max-md:flex-col max-md:items-center justify-evenly gap-3 pt-2">
            
            {data?.image && (
              <Image
                src={data?.image}
                width={190}
                height={302}
                alt="profile"
                className="rounded-xl"
              />
            )}
            <div className="w-full gap-2 flex flex-col ">
              
              <InfoBox
                label="گروه کالا"
                value={data?.product_group.title}
                variant={"single"}
              />
              <InfoBox
                label="کشور"
                value={data?.country.name}
                variant={"single"}
              />
              <InfoBox
                label="فرایند"
                value={data?.process.title}
                variant={"single"}
              />
            </div>
          </div>
        </div>
        {/* Times */}
        <div className="lg:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 flex flex-col gap-5">
          {data?.online_working_days && (
            <div>
              <h1 className="text-custom font-bold text-sm">
                ساعت کاری مشاورآنلاین
              </h1>
              <div className="flex flex-col gap-1 mt-3">
                {data.online_working_days.map((day) => (
                  <span key={day.id} className="text-xs text-gray-600">
                    {day.day_name} :
                    <div className="flex gap-2">
                      {day.time_slots.map((time, index) => (
                        <div key={index}>
                          {time.start_time.slice(0, 5)} الی
                          {time.end_time.slice(0, 5)}
                        </div>
                      ))}
                    </div>
                  </span>
                ))}
              </div>
            </div>
          )}{" "}
          {data?.offline_working_days && (
            <div>
              <h1 className="text-custom font-bold text-sm">
                ساعت کاری مشاوره حضوری
              </h1>
              <div className="flex flex-col gap-1 mt-3">
                {data.offline_working_days.map((day) => (
                  <p key={day.id} className="text-xs text-gray-600">
                    {day.day_name} :
                    {day.time_slots.map((time) => time.start_time)}
                    {day.time_slots.map((time) => time.end_time)}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Price */}
        <div className="lg:w-2/5 shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-3 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-custom">تعرفه جلسات مشاوره</h1>
            <div className="flex gap-3 items-center">
              <span>{data?.price} تومان</span>
              <p className="text-xs text-gray-600">
                به ازای هر ساعت مشاوره حضوری
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <span>{data?.price_for_offline} تومان</span>
              <p className="text-xs text-gray-600">
                
                به ازای هر ساعت مشاوره آفلاین
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* ================= Form ================= */}
      <form
        onSubmit={handleSubmit}
        className="w-full shadow-[0_0_20px_rgba(0,0,0,0.12)] rounded-xl p-6 flex flex-col gap-6"
      >
        <h2 className="text-sm font-bold">فرم درخواست</h2>


        <div className="grid md:grid-cols-5 gap-4">
          <Input
            label="نام و نام خانوادگی"
            value={formState.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          <Input
            label="شماره تماس"
            value={formState.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            label="تاریخ جلسه"
            type="date"
            value={formState.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <Input
            label="ساعت شروع"
            type="time"
            value={formState.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
          />
          <Input
            label="ساعت پایان"
            type="time"
            value={formState.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
          />
        </div>
            <div className="grid md:grid-cols-3 gap-4">
          <Input
            label="شغل"
            value={formState.job}
            onChange={(e) => handleChange("job", e.target.value)}
          />
          <Input
            label="سمت"
            value={formState.position}
            onChange={(e) => handleChange("position", e.target.value)}
          />
          <Input
            label="کالای مورد نظر"
            value={formState.product}
            onChange={(e) => handleChange("product", e.target.value)}
          />
        </div>

          <div className="flex justify-between max-md:flex-col max-md:gap-6">
           <RadioGroup
          label="نوع جلسه"
          name="sessionType"
          value={formState.sessionType}
          onChange={(val) => handleChange("sessionType", val)}
          options={[
            { label: "حضوری", value: "offline" },
            { label: "آنلاین", value: "online" },
          ]}
        />

        <RadioGroup
          label="کارت بازرگانی"
          name="businessCard"
          value={formState.businessCard}
          onChange={(val) => handleChange("businessCard", val)}
          options={[
            { label: "دارم", value: "yes" },
            { label: "ندارم", value: "no" },
          ]}
        />

        <RadioGroup
          label="شخصیت"
          name="personType"
          value={formState.personType}
          onChange={(val) => handleChange("personType", val)}
          options={[
            { label: "حقیقی", value: "real" },
            { label: "حقوقی", value: "legal" },
          ]}
        />
          </div>


        <Textarea
          label="آدرس"
          value={formState.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <Textarea
          label="متن درخواست"
          value={formState.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <div className="flex lg:w-1/3 w-full gap-4 left-0">
          <Button type="submit" variant="secondary">
            {submitting ? "در حال ارسال..." : "ارسال درخواست"}
          </Button>
          </div>
      </form>
    </div>
  );
}

/* ================= Components ================= */

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex flex-col text-sm gap-2">
      {label}
      <input
        {...props}
        className="bg-gray-100 px-3 py-2 rounded-xl outline-none"
      />
    </label>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="flex flex-col text-sm gap-2">
      {label}
      <textarea
        {...props}
        className="bg-gray-100 px-3 py-2 rounded-xl outline-none h-28"
      />
    </label>
  );
}

function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-6">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-[#5764EF]"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
}
