'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ITEM_HEIGHT = 48;

const MONTHS = [
  'فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور',
  'مهر','آبان','آذر','دی','بهمن','اسفند'
];

const YEARS = Array.from({ length: 10 }, (_, i) => 1400 + i);

export default function DateFilterUI() {
  const [month, setMonth] = useState('بهمن');
  const [year, setYear] = useState(1404);
  const [open, setOpen] = useState(true);

  return (
    <div className="w-full bg-white p-4" dir="rtl">

      {/* Picker */}
      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="relative flex h-[240px]">

          {/* Selection lines */}
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
    </div>
  );
}

/* ---------------- Scroll Column ---------------- */

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
  }, []);

  const onScroll = (e: React.UIEvent<HTMLUListElement>) => {
    const index = Math.round(e.currentTarget.scrollTop / ITEM_HEIGHT);
    if (index !== active && index >= 0 && index < items.length) {
      setActive(index);
    }
  };

  const onScrollEnd = () => {
    onSelect(items[active]);
  };

  return (
    <div className="flex-1 relative">
      {/* Fade */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-white z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white z-10 pointer-events-none" />

      <ul
        ref={ref}
        onScroll={onScroll}
        onMouseUp={onScrollEnd}
        onTouchEnd={onScrollEnd}
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
