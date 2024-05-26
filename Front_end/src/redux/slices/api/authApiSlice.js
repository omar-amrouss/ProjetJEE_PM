import { apiSlice } from "../apiSlice"

const AUTH_URI = "/user"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints : (builder) => ({
    login : builder.mutation({
      query : (data) => ({
        url : `${AUTH_URI}/login`,
        method : "POST",
        body : data,
      }),
    }),
    register : builder.mutation({
      query : (data) => ({
        url : `${AUTH_URI}/register`,
        method : "POST",
        body : data,
        credentials:"include"
      }),
    }),
    logout : builder.mutation({
      query : (data) => ({
        url : `${AUTH_URI}/logout`,
        method : "POST",
        credentials:"include"
      }),
    }),
  }),
})

export const {useLoginMutation , useRegisterMutation , useLogoutMutation} = authApiSlice