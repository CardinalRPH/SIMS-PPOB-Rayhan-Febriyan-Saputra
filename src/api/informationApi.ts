import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import metaEnv from "../env";
import type { ApiResponseData } from "../types/apiResponseData";
import type {
  BannerResponseType,
  ServiceResponseType,
} from "../dto/information.dto";

const infomationApi = createApi({
  reducerPath: "informationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: metaEnv.VITE_API_URL,
  }),
  endpoints: (build) => ({
    getBanner: build.query<ApiResponseData<BannerResponseType>, any>({
      query: () => "/banner",
    }),
    getService: build.query<ApiResponseData<ServiceResponseType>, any>({
      query: () => "/services",
    }),
  }),
});

export const { useGetBannerQuery, useGetServiceQuery } = infomationApi;
