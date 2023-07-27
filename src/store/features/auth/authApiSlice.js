// this the extended slice for auth
import { apiSlice } from "@/store/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // build.mutation is used for POST, PUT, DELETE
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),

    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    verify: builder.mutation({
      query: (email) => ({
        url: `/auth/verify?email=${email}`,
        method: "POST",
      }),
    }),
    checkVerify: builder.mutation({
      query: (credentials) => ({
        url: `/auth/check-verify`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getAdmin: builder.query({
      query: () => `/auth/dashboard/me`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["user"],
      invalidatesTags: ["user"],
      
     
    }),
    // getToken and no store cache and refecht every mount component
    getToken: builder.query({
      query: () => `/auth/dashboard/me`,
      providesTags: ["token"],
      refetchOnMount: "always",
      refetchOnReconnect: "always",
      refetchOnFocus: "always",
      refetchOnReconnect: "always",
      refetchOnMountOrArgChange: "always",
    }),

    verifyForgotPassword: builder.mutation({
      query: (email) => ({
        url: `auth/verify-forgot-password?email=${email}`,
        method: "POST",
      }),
    }),
    resetPassword: builder.mutation({
      query: (credentials) => ({
        url: `auth/reset-password`,
        method: "POST",
        body: { ...credentials },
      }),
    }),
    checkVerifyForgotPassword: builder.mutation({
      query: (credentials) => ({
        url: `auth/check-verify-forgot-password`,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    registerWithGoogle: builder.mutation({
      query: ( credentials ) => ({
        url: `/auth/register-with-google`,
        method: "POST",
        body: { ...credentials }

      })
    }),
    
    newRegisterWithGoogle:builder.mutation({
      query:(email)=>({
        url: 'auth/register-with-google',
        method: 'POST',
        body: {email}
      }),
      invalidatesTags: ['user']
      
    })
  }),
});
// auto generated hooks for login mutation
// auth/check-verify auth/dashboard/me
export const {
  //nv ng tah chento
  useLoginMutation,
  useRegisterMutation,
  useVerifyMutation,
  useCheckVerifyMutation,
  useGetAdminQuery,
  useVerifyForgotPasswordMutation,
  useResetPasswordMutation,
  useCheckVerifyForgotPasswordMutation,
  useGetTokenQuery,
  useRegisterWithGoogleMutation,
  useNewRegisterWithGoogleMutation
} = authApiSlice;
