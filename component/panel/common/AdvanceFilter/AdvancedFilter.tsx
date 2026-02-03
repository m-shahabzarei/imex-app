// "use client"

// import React from "react"
// import { useQuery } from "@tanstack/react-query"

// import { getCountries, getCustoms } from "./filter.service"

// export type AdvancedFilterState = {
//   country?: number
//   customs?: number
//   code: string
// }


// type Props = {
//   code: string
//   onApply: (filters: AdvancedFilterState) => void
// }

// export default function AdvancedFilter({
//   code,
//   onApply,
// }: Props) {
//   const [filters, setFilters] =
//     React.useState<AdvancedFilterState>({
//       code,
//     })

//   /* -------- Countries -------- */
//   const { data: countries, isLoading: countryLoading } =
//     useQuery({
//       queryKey: ["countries", filters.customs, code],
//       queryFn: () =>
//         getCountries({
//           customs: filters.customs,
//           code,
//         }),
//     })

//   /* -------- Customs -------- */
//   const { data: customs, isLoading: customsLoading } =
//     useQuery({
//       queryKey: ["customs", filters.country, code],
//       queryFn: () =>
//         getCustoms({
//           country: filters.country,
//           code,
//         }),
//     })

//   return (
//     <div className="space-y-4 rounded-xl bg-white p-4 shadow">

//       {/* Country */}
//       <div>
//         <label className="block mb-1">
//           کشور
//         </label>
//         <select
//           className="w-full border p-2"
//           value={filters.country ?? ""}
//           onChange={(e) =>
//             setFilters((prev) => ({
//               ...prev,
//               country: e.target.value
//                 ? Number(e.target.value)
//                 : undefined,
//             }))
//           }
//         >
//           <option value="">همه</option>
//           {countries?.results?.map((c: any) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         {countryLoading && <p>در حال بارگذاری…</p>}
//       </div>

//       {/* Customs */}
//       <div>
//         <label className="block mb-1">
//           گمرک
//         </label>
//         <select
//           className="w-full border p-2"
//           value={filters.customs ?? ""}
//           onChange={(e) =>
//             setFilters((prev) => ({
//               ...prev,
//               customs: e.target.value
//                 ? Number(e.target.value)
//                 : undefined,
//             }))
//           }
//         >
//           <option value="">همه</option>
//           {customs?.results?.map((c: any) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//         {customsLoading && <p>در حال بارگذاری…</p>}
//       </div>

//       {/* Apply */}
//       <button
//         className="w-full rounded bg-blue-600 py-2 text-white"
//         onClick={() => onApply(filters)}
//       >
//         اعمال فیلتر
//       </button>
//     </div>
//   )
// }
