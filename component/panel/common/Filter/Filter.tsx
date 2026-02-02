"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { FilterConfig } from "./type";
import FilterItem from "./FilterItem";
import { useQueryParams } from "@/hooks/useQueryParams";
import Button from "@/component/ui/Button";
import Accordion from "../../book/tariffs/Accordion";

interface Props {
  config: FilterConfig[];
  open: boolean;
  onClose: () => void;
}

export default function Filters({ config, open, onClose }: Props) {
  const { params, setParams } = useQueryParams();

  const [localFilters, setLocalFilters] = useState<Record<string, any>>({});
  const isInitialized = useRef(false);

  /**
   * sync initial filters from URL (only once)
   */
  useEffect(() => {
    if (isInitialized.current) return;

    const initial: Record<string, any> = {};

    config.forEach((filter) => {
      if (params[filter.key] !== undefined) {
        initial[filter.key] = params[filter.key];
      }
    });

    setLocalFilters(initial);
    isInitialized.current = true;
  }, [config, params]);

  /**
   * apply filters to URL
   */
  const applyFilters = () => {
    setParams(localFilters);
    onClose();
  };

  /**
   * clear filters from URL and UI
   */
  const resetFilters = () => {
    const cleared: Record<string, any> = {};

    config.forEach((filter) => {
      cleared[filter.key] = undefined; // 👈 remove param from URL
    });
    setParams({});
    setLocalFilters({});
    setParams(cleared);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="absolute left-0 mt-4 w-84 bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.12)] p-3 z-[1000] space-y-6 max-md:fixed max-md:space-y-10 max-md:w-full max-md:bottom-0">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-custom">فیلتر</h1>
        <span
          onClick={onClose}
          className="cursor-pointer"
        >
          <Image
            src="/image/close.png"
            alt="close icon"
            width={20}
            height={20}
          />
        </span>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {config.map((filter) => (
          <Accordion title={filter.label} key={filter.key} isFilter>
          <FilterItem
            filter={filter}
            value={localFilters[filter.key]}
            onChange={(key, value) =>
              setLocalFilters((prev) => ({
                ...prev,
                [key]: value,
              }))
            }
          />
          </Accordion>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="glassy" onClick={resetFilters}>
          حذف فیلتر
        </Button>

        <Button variant="secondary" onClick={applyFilters}>
          اعمال
        </Button>
      </div>
    </div>
  );
}
