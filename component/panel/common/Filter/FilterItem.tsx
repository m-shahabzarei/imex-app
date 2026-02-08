"use client";

import DateFilterUI from "./MonthYearPicker";
import RemoteMultiCheckbox from "./RemoteMultiCheckbox";
import { FilterConfig } from "./type";

interface Props {
  filter: FilterConfig;
  value: any;
  onChange: (key: string, value: any) => void;
}

export default function FilterItem({ filter, value, onChange }: Props) {
  // ---------- SINGLE CHECKBOX ----------
  if (filter.type === "checkbox") {
    return (
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={value === "true" || value === true}
          onChange={(e) => onChange(filter.key, e.target.checked)}
        />
        {filter.label}
      </label>
    );
  }

  // --------------- DATE FILTER -----------
  if (filter.type === "Date") {
    return (
      <DateFilterUI
        label={filter.label}
        value={value || ""}
        onChange={(gregorianDate) => onChange(filter.key, gregorianDate)}
      />
    );
  }

  // ---------- MULTI CHECKBOX ----------
  if (filter.type === "multi-checkbox") {
    const selectedValues: string[] = value
      ? Array.isArray(value)
        ? value
        : String(value).split(filter.separator || ",")
      : [];

    const toggleValue = (val: string | number) => {
      let updated = selectedValues.includes(String(val))
        ? selectedValues.filter((v) => v !== String(val))
        : [...selectedValues, String(val)];

      if (updated.length === 0) {
        onChange(filter.key, undefined);
        return;
      }

      if (filter.separator) {
        onChange(filter.key, updated.join(filter.separator));
      } else {
        onChange(filter.key, updated);
      }
    };

    return (
      <div>
        <div className="space-y-2">
          {filter.options?.map((opt) => (
            <label key={opt.value} className="flex text-sm items-center gap-2">
              <input
                type="checkbox"
                checked={selectedValues.includes(String(opt.value))}
                onChange={() => toggleValue(opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (filter.type === "multi-checkbox-remote") {
    return (
      <RemoteMultiCheckbox filter={filter} value={value} onChange={onChange} />
    );
  }

  return null;
}