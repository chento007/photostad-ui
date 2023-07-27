import { apiSlice } from "@/store/api/apiSlice";

export const watermarkApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getWatermark: builder.query({
            query:({page,limit})=>`/statistics/watermark-download?page=${page}&limit=${limit}`,
            keepUnusedDataFor: 5,
            invalidatesTags: ["Watermark"],
        })
    })
})
export const {useGetWatermarkQuery} = watermarkApiSlice