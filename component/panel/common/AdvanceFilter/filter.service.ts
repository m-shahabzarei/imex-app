// import qs from "qs"

// /* ================= TYPES ================= */

// export type FilterState = {
//   country?: number
//   customs?: number
//   code: string | undefined
// }

// /* ================= API HELPERS ================= */

// async function request<T>(url: string): Promise<T> {
//   const res = await fetch(url, { cache: "no-store" })
//   if (!res.ok) throw new Error("API Error")
//   return res.json()
// }

// /* ================= FILTER OPTIONS ================= */

// /**
//  * Get countries
//  * Filters by customs + code if provided
//  */
// export function getCountries(params: {
//   customs?: number
//   code: string
// }) {
//   const query = qs.stringify(
//     {
//       customs_name: params.customs,
//       code: params.code,
//     },
//     { skipNulls: true }
//   )

//   return request(
//     `https://api.imexapp.ir/core/country/?${query}`
//   )
// }

// /**
//  * Get customs
//  * Filters by country + code if provided
//  */
// export function getCustoms(params: {
//   country?: number
//   code: string
// }) {
//   const query = qs.stringify(
//     {
//       country: params.country,
//       code: params.code,
//     },
//     { skipNulls: true }
//   )

//   return request(
//     `https://api.imexapp.ir/customs-name/?${query}`
//   )
// }

// /* ================= MAIN DATA ================= */

// export function getTrades(filters: FilterState) {
//   const query = qs.stringify(filters, {
//     skipNulls: true,
//   })

//   return request(
//     `https://api.imexapp.ir/book/tariff/trade/?${query}`
//   )
// }
