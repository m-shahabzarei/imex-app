/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import jalaali from 'jalaali-js';

const ITEM_HEIGHT = 48;

const MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

const YEARS = Array.from({ length: 10 }, (_, i) => 1400 + i);

// shamsi to miladi
function toGregorianFirstDay(jy: number, jm: number): string {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, 1);
  const mm = String(gm).padStart(2, '0');
  const dd = String(gd).padStart(2, '0');
  return `${gy}-${mm}-${dd}`;
}

// miladi to shamsi
function fromGregorian(dateStr: string): { jy: number; jm: number } | null {
  if (!dateStr) return null;
  try {
    const [gy, gm, gd] = dateStr.split('-').map(Number);
    const { jy, jm } = jalaali.toJalaali(gy, gm, gd);
    return { jy, jm };
  } catch {
    return null;
  }
}

interface DateFilterUIProps {
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
}

export default function DateFilterUI({ label, value, onChange }: DateFilterUIProps) {
  const today = jalaali.toJalaali(new Date());
  const parsed = value ? fromGregorian(value) : null;

  const [month, setMonth] = useState(MONTHS[(parsed?.jm ?? today.jm) - 1]);
  const [year, setYear] = useState(parsed?.jy ?? today.jy);

  const prevValueRef = useRef<string>('');

  useEffect(() => {
    const jm = MONTHS.indexOf(month) + 1;
    const gregorianDate = toGregorianFirstDay(year, jm);

    if (gregorianDate !== prevValueRef.current) {
      prevValueRef.current = gregorianDate;
      onChange?.(gregorianDate);
    }
  }, [month, year, onChange]);

  return (
    <div className="w-full bg-white p-4" dir="rtl">
      <div className="relative flex h-[240px]">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[48px] border-y pointer-events-none" />

        <ScrollColumn
          items={MONTHS}
          selected={month}
          onSelect={setMonth}
        />

        <ScrollColumn
          items={YEARS}
          selected={year}
          onSelect={setYear}
        />
      </div>
    </div>
  );
}

/* ==================== Scroll Column ==================== */

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
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const index = items.indexOf(selected);
    if (index !== -1 && ref.current) {
      ref.current.scrollTop = index * ITEM_HEIGHT;
      setActive(index);
    }
    isInitialMount.current = false;
  }, []);

  useEffect(() => {
    if (isInitialMount.current) return;
    const index = items.indexOf(selected);
    if (index !== -1 && index !== active && ref.current) {
      ref.current.scrollTo({ top: index * ITEM_HEIGHT, behavior: 'smooth' });
      setActive(index);
    }
  }, [selected]);

  const onScroll = useCallback(() => {
    if (!ref.current) return;

    const index = Math.round(ref.current.scrollTop / ITEM_HEIGHT);
    if (index >= 0 && index < items.length) {
      setActive(index);
    }

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      const finalIndex = Math.round((ref.current?.scrollTop ?? 0) / ITEM_HEIGHT);
      if (finalIndex >= 0 && finalIndex < items.length) {
        setActive(finalIndex);
        onSelect(items[finalIndex]);
        ref.current?.scrollTo({
          top: finalIndex * ITEM_HEIGHT,
          behavior: 'smooth',
        });
      }
    }, 120);
  }, [items, onSelect]);

  return (
    <div className="flex-1 relative">
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white z-10 pointer-events-none" />

      <ul
        ref={ref}
        onScroll={onScroll}
        className="h-full overflow-y-auto snap-y snap-mandatory py-[96px] scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {items.map((item, i) => {
          const dist = Math.abs(i - active);
          return (
            <li
              key={item}
              onClick={() =>
                ref.current?.scrollTo({
                  top: i * ITEM_HEIGHT,
                  behavior: 'smooth',
                })
              }
              className={`
                h-[48px] flex items-center justify-center snap-center cursor-pointer
                transition-all
                ${i === active ? 'text-xl font-bold text-black' : 'text-gray-400'}
                ${dist > 1 ? 'opacity-30' : dist === 1 ? 'opacity-60' : 'opacity-100'}
              `}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}