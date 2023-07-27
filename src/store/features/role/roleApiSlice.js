import { apiSlice } from "@/store/api/apiSlice";

export const roleApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getRole: builder.query({
            query:(token) => ({
                url: `/roles`,
                method: "GET",
                header:{
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            

        })
    })
})
export const {
    useGetRoleQuery
} = roleApiSlice