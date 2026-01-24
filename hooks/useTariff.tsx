import { useQuery } from "@tanstack/react-query"
export const useTariff = ()=>{
    const {
        data:tariff,
        isLoading,
        error
    } = useQuery({
        queryKey : ['course'],
        queryFn: async () =>{
            const res = await fetch ("https://api.imexapp.ir/book/tariff/?page=1&search=&date_range_after=2025-03-21&date_range_before=2026-03-20")
            return res.json()
        },
    });

    return {tariff,isLoading,error}

}