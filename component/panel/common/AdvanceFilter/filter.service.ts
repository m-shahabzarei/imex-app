import { buildQuery } from "@/utils/filter.utils"
import axios from "axios"


const api = axios.create({
  baseURL: "https://api.imexapp.ir",
  headers: {
    Authorization: "JWT YOUR_TOKEN"
  }
})

export const filterService = {
  getCountries: async () => {
    const { data } = await api.get("/core/country/")
    return data.results
  },

  getCustoms: async (params: {
    country?: number
    code?: string
  }) => {
    const query = buildQuery({
      page: 1,
      country: params.country,
      code: params.code
    })

    const { data } = await api.get("/customs-name/", { params: query })
    return data.results
  },

  getReport: async (filters: any) => {
    const query = buildQuery(filters)
    const { data } = await api.get("/book/tariff/64789/statistics/report/", { params: query })
    return data
  }
}
