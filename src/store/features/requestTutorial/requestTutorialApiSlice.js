import { apiSlice } from "@/store/api/apiSlice";

export const requestTutorialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRequestTutorials: builder.query({
      query: ({ page, limit, isRead, isReadAll }) =>
        `request-tutorials?page=${page}&limit=${limit}&isDeleted=false&isRead=${isRead}&isReadAll=${isReadAll}`,
      invalidatesTags: ["RequestTutorial"], //invalidateTags is used to refetch the data when the mutation is done
      providesTags: ["RequestTutorial"], // providesTags is used to cache the data
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
    }),
    getRequestTutorialById: builder.query({
      query: (id) => `/request-tutorials/${id}`,
    }),
    updateRequestTutorialById: builder.mutation({
      query: (id, credentials) => ({
        url: `/request-tutorials/${id}`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["RequestTutorial"], //invalidateTags is used to refetch the data when the mutation is done
    }),
    getAllUnread: builder.query({
      query: () => "request-tutorials?page=1&limit=1000&isDeleted=false&isRead=false&isReadAll=false",
      providesTags: ["RequestTutorial"],
      keepUnusedDataFor: 5,
      invalidatesTags: ["RequestTutorial"],
    }),
    getAllReaded: builder.query({
      query: () => "request-tutorials?page=1&limit=1000&isDeleted=false&isRead=true&isReadAll=false",
      keepUnusedDataFor: 5,
      providesTags: ["RequestTutorial"],
      invalidatesTags: ["RequestTutorial"],
    }),
    removeRequestTutorialById: builder.mutation({
      query: (credentials) => ({
        url: `/request-tutorials/${id}`,
        method: "DELETE",
        body: { ...credentials },
      }),
      invalidatesTags: ["RequestTutorial"], //invalidateTags is used to refetch the data when the mutation is done
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/request-tutorials/${id}/true/update-status`,
        method: "PUT",
      }),
      invalidatesTags: ["RequestTutorial"],
    }),
    markAsUnread: builder.mutation({
      query: (id) => ({
        url: `/request-tutorials/${id}/false/update-status`,
        method: "POST",
      }),
      invalidatesTags: ["RequestTutorial"], //invalidateTags is used to refetch the data when the mutation is done
    }),
    deleteRequestTutorial: builder.mutation({
      query: (id) => ({
        url: `/request-tutorials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RequestTutorial"],
    }),
    createRequestTutorial: builder.mutation({
      query: (data) => ({
        url: `/request-tutorials/user-request`,
        method: "POST",
        body: data
      }),
      invalidatesTags: ["RequestTutorial"],
    }),
  }),
});
export const {
  useGetAllRequestTutorialsQuery,
  // useAddRequestTutorialsMutation,
  useGetRequestTutorialByIdQuery,
  useUpdateRequestTutorialByIdMutation,
  useGetAllUnreadQuery,
  useGetAllReadedQuery,
  useRemoveRequestTutorialByIdMutation,
  useMarkAsReadMutation,
  useMarkAsUnreadMutation,
  //work nv tah chento
  useDeleteRequestTutorialMutation,
  useCreateRequestTutorialMutation
} = requestTutorialApiSlice;
