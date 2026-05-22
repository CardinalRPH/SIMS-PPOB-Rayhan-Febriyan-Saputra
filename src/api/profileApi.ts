import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import metaEnv from "../env";
import type { ApiResponseData } from "../types/apiResponseData";
import type { RootState } from "../stores";
import type { ProfileGetResponseType } from "../dto/membership.dto";
import type { updateProfileSchemaType } from "../components/form/validations/profileSchema";

const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: metaEnv.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (build) => ({
    getProfile: build.query<ApiResponseData<ProfileGetResponseType>, any>({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),

    updateProfile: build.mutation<
      ApiResponseData<ProfileGetResponseType>,
      updateProfileSchemaType
    >({
      query: (dataUpdate) => ({
        url: "/profile/update",
        body: dataUpdate,
        method: "PUT",
      }),
      invalidatesTags: ["Profile"],
    }),
    updateProfileImage: build.mutation<any, FormData>({
      query: (formData) => ({
        url: "/profile/image",
        body: formData,
        method: "PUT",
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} = profileApi;
