import { useQuery } from "@tanstack/react-query"
export const useCourse = ()=>{
    const {
        data:course,
        isLoading,
        error
    } = useQuery({
        queryKey : ['course'],
        queryFn: async () =>{
            const res = await fetch ("https://api.imexapp.ir/knowledge/course/")
            return res.json()
        },
    });

    return {course,isLoading,error}

}