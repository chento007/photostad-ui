import { apiSlice } from "@/store/api/apiSlice";
export const certificateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCertificate: builder.query({
      query: ({ page, limit }) => `/statistics/certificate-download?page=${page}&limit=${limit}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      invalidatesTags: ["Certificate"], //invalidateTags is used to refetch the data when the mutation is done
    })
  }),
});

export const { useGetCertificateQuery } = certificateApiSlice;