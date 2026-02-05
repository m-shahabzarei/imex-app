"use client"

import { useEffect, useState } from "react"
import { AdvancedFilters, Option } from "./type"
import { filterService } from "./filter.service"

export default function AdvancedFilter() {
  // 🔹 Draft (در حال انتخاب)
  const [draftFilters, setDraftFilters] = useState<AdvancedFilters>({
    code: "01012100"
  })

  // 🔹 Applied (اعمال‌شده)
  const [appliedFilters, setAppliedFilters] =
    useState<AdvancedFilters | null>(null)

  // 🔹 Option states
  const [countries, setCountries] = useState<Option[]>([])
  const [customs, setCustoms] = useState<Option[]>([])

  // =============================
  // Load Countries (once)
  // =============================
  useEffect(() => {
    filterService.getCountries().then(setCountries)
  }, [])

  // =============================
  // Load Customs (dependent)
  // =============================
  useEffect(() => {
    filterService
      .getCustoms({
        country: draftFilters.country,
        code: draftFilters.code
      })
      .then(setCustoms)
  }, [draftFilters.country, draftFilters.code])

  // =============================
  // Apply Filters
  // =============================
  useEffect(() => {
    if (!appliedFilters) return

    filterService.getReport({
      page: 1,
      country: appliedFilters.country,
      customs_name: appliedFilters.customs,
      code: appliedFilters.code,
      date: appliedFilters.date
    })
  }, [appliedFilters])

  // =============================
  // Handlers
  // =============================
  const onCountryChange = (id: number) => {
    setDraftFilters(prev => ({
      ...prev,
      country: id,
      customs: undefined
    }))
  }

  const onCustomsChange = (id: number) => {
    setDraftFilters(prev => ({
      ...prev,
      customs: id
    }))
  }

  const onApply = () => {
    setAppliedFilters(draftFilters)
  }

  // =============================
  // UI
  // =============================
  return (
    <div>
      {/* Country */}
      <select
        value={draftFilters.country ?? ""}
        onChange={e => onCountryChange(Number(e.target.value))}
      >
        <option value="">همه کشورها</option>
        {countries.map(c => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {/* Customs */}
      <select
        value={draftFilters.customs ?? ""}
        onChange={e => onCustomsChange(Number(e.target.value))}
        disabled={!draftFilters.country}
      >
        <option value="">
          {draftFilters.country
            ? "انتخاب گمرک"
            : "ابتدا کشور را انتخاب کنید"}
        </option>
        {customs.map(c => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      {/* Apply */}
      <button onClick={onApply}>اعمال فیلتر</button>
    </div>
  )
}
