"use client"

import AdvancedFilter from "@/component/panel/common/AdvanceFilter/AdvancedFilter"
import { filterService } from "@/component/panel/common/AdvanceFilter/filter.service"
import { AdvancedFilters } from "@/component/panel/common/AdvanceFilter/type"
import { useEffect, useState } from "react"


export default function ReportPage() {
  const [filters, setFilters] = useState<AdvancedFilters>({
    code: "01012100"
  })

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // وقتی کاربر Apply می‌زنه
  const onApplyFilters = async (newFilters: AdvancedFilters) => {
    setFilters(newFilters)
  }

  // گرفتن دیتای اصلی
  useEffect(() => {
    setLoading(true)

    filterService
      .getReport({
        page: 1,
        country: filters.country,
        customs_name: filters.customs,
        code: filters.code,
        date: filters.date
      })
      .then(setData)
      .finally(() => setLoading(false))
  }, [filters])

  return (
    <div>
      <AdvancedFilter onApply={onApplyFilters} />

      {loading && <p>در حال بارگذاری...</p>}

      {!loading && data.length === 0 && <p>یافت نشد</p>}

      <ul>
        {data.map((item, i) => (
          <li key={i}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  )
}
