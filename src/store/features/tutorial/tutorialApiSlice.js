import { apiSlice } from "@/store/api/apiSlice";

export const toturailApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getTutorial: builder.query({
      query: ({ page, perPage, name }) => `/tutorials?page=${page}&limit=${perPage}&name=${name}&isDeleted=false`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Tutorial"], // provideTags are used for updating cache
      invalidatesTags: ["Tutorial"], //invalidateTags is used to refetch the data when the mutation is done
    }),

    getTutorialUUID: builder.query({
      query: ({ page, perPage, name }) => `/tutorials/front?page=${page}&limit=${perPage}&name=${name}&isDeleted=false`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Tutorial"], // provideTags are used for updating cache
      invalidatesTags: ["Tutorial"], //invalidateTags is used to refetch the data when the mutation is done
    }),

    getTutorialByUUID: builder.query({
      query: (id) => `/tutorials/front/${id}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["Tutorial"], // provideTags are used for updating cache
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
  useGetTutorialByUUIDQuery,
  useGetTutorialUUIDQuery,
  useGetTutorialQuery,
  useDeleteTutorialMutation,
  useCreateTutorialMutation,
  useUpdateTutorialMutation,
  useGetTutorialByIdQuery,
} = toturailApiSlice;
