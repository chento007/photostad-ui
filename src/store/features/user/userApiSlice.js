import { apiSlice } from "@/store/api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/auth/me`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
      invalidatesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: ({ page, limit,name }) => `/users?page=${page}&limit=${limit}&name=${name}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
      invalidatesTags: ["User"],
    }),
    getUserByEmail: builder.query({
      query: ({ userEmail }) => `/users/email?email=${userEmail}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
      invalidatesTags: ["User"],
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      keepUnusedDataFor: 5, // keep unused data in cache for 5 seconds
      providesTags: ["User"], // provideTags are used for updating cache
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // invalidatesTags are used for updating cache
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body:{...data},
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      // query: ({ id, token }) => ({
      //   url: `/users/${id}`,
      //   method: "DELETE",
      //   header: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${token}`,
      //   }
      // }),
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "DELETE",
        body:{...data},
      }),
      invalidatesTags: ["User"],
    }),
    updatePasswordById: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/${id}/change-password`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
    }),

    chnagePasswordAdminyId: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/${id}/change-password-user`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: ({ uuid, data }) => ({
        url: `users/${uuid}/update-profile-client`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
    }),

    updateProfile: builder.mutation({
      query: ({ uuid, data }) => ({
        url: `users/${uuid}/update-profile-client`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
      
    }),
    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}/update-profile`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],

    })
    ,

    updateInformationClient: builder.mutation({
      query: ({ uuid, data }) => ({
        url: `users/${uuid}/update-information-client`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["User"],
    }),



  }),
});

// auto generated hooks for getUser query (GET)
export const {
  
  useChnagePasswordAdminyIdMutation,
  useGetUserQuery,
  useGetAllUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useGetUserByEmailQuery,
  useUpdatePasswordByIdMutation,
  useUpdateProfileMutation,
  useUpdateInformationClientMutation,
  useUpdateAdminMutation,


} = userApiSlice;