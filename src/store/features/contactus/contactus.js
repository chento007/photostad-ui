import { apiSlice } from "@/store/api/apiSlice";

export const toturailApiSlice = apiSlice.injectEndpoints({

  endpoints: (builder) => ({

    getContactUs: builder.query({
      query: ({page, perPage}) => `/contact-us`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["ContactUs"], // provideTags are used for updating cache
      invalidatesTags: ["ContactUs"], //invalidateTags is used to refetch the data when the mutation is done
    }),


    createContactUs: builder.mutation({
      query: (data) => ({
        url: `/contact-us`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContactUs"],
    }),


  }),
});
// auto generated hooks for getUser query (GET)
export const {
  useGetContactUsQuery,
  useCreateContactUsMutation,
} = toturailApiSlice;