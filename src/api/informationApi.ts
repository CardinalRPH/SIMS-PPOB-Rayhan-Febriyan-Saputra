import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import metaEnv from "../env";
import type { ApiResponseData } from "../types/apiResponseData";
import type {
  BannerResponseType,
  ServiceResponseType,
} from "../dto/information.dto";
import type { RootState } from "../stores";

export const infomationApi = createApi({
  reducerPath: "informationApi",
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
  endpoints: (build) => ({
    getBanner: build.query<ApiResponseData<BannerResponseType[]>, void>({
      query: () => "/banner",
    }),
    getService: build.query<ApiResponseData<ServiceResponseType[]>, void>({
      query: () => "/services",
    }),
  }),
});

export const { useGetBannerQuery, useGetServiceQuery } = infomationApi;
