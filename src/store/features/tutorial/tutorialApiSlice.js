import { apiSlice } from "@/store/api/apiSlice";

export const toturailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTutorial: builder.query({
      //{{base-rest}}tutorials?page=1&limit=20&name=&isDeleted=false
      query: ({page, perPage,name}) => `/tutorials?page=${page}&limit=${perPage}&name=${name}&isDeleted=false`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Tutorial"], // provideTags are used for updating cache
      invalidatesTags: ["Tutorial"], //invalidateTags is used to refetch the data when the mutation is done
    }),

    deleteTutorial: builder.mutation({
      query: (id) => ({
        url: `/tutorials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tutorial"],
    }),

    createTutorial: builder.mutation({
      query: (data) => ({
        url: `/tutorials`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tutorial"],
    }),
    updateTutorial: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tutorials/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tutorial"],
    }),
    getTutorialById: builder.query({
      query: (id) => `/tutorials/${id}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Tutorial"], // provideTags are used for updating cache
    }),
  }),
});
// auto generated hooks for getUser query (GET)
export const {
  useGetTutorialQuery,
  useDeleteTutorialMutation,
  useCreateTutorialMutation,
  useUpdateTutorialMutation,
  useGetTutorialByIdQuery,
} = toturailApiSlice;
