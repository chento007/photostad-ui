import { apiSlice } from "@/store/api/apiSlice";

export const unreadReqApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        getUnreadReq: builder.query({
            query: ({page,limit})=> `request-tutorials/is-read?isRead=false&page=${page}&isDeleted=false&limit=${limit}`,
            keepUnusedDataFor: 5,
            invalidatesTags: ['UnreadReq'],
            providesTags: ['UnreadReq']
            
        }),
        deleteUnreadReq: builder.mutation({
            query: (id)=>({
                url: `/request-tutorials/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['UnreadReq']
        })
    })
})
export const { useGetUnreadReqQuery ,useDeleteUnreadReqMutation} = unreadReqApiSlice