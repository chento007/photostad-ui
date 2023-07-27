import { apiSlice } from "@/store/api/apiSlice";

export const readedTutorialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReadedTutorial: builder.query({
      query: ({page,limit}) => `/request-tutorials/is-read?isRead=true&page=${page}&isDeleted=false&limit=${limit}`,

      keepUnusedDataFor: 5,
      providesTags: ["ReadedTutorial"],
      invalidatesTags: ["ReadedTutorial"],
    }),
  }),
});

export const { useGetReadedTutorialQuery } = readedTutorialApiSlice;
