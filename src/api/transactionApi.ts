import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import metaEnv from "../env";
import type { ApiResponseData } from "../types/apiResponseData";
import type { RootState } from "../stores";
import type {
  BalanceResponseType,
  ctResponse,
  RecordType,
  TransactionResponseType,
} from "../dto/transaction.dto";
import type {
  topUpSchemaType,
  transactionSchemaType,
} from "../components/form/validations/transactionSchema";

export const transactionApi = createApi({
  reducerPath: "transactionApi",
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
  tagTypes: ["balance", "history"],
  endpoints: (build) => ({
    getBalance: build.query<ApiResponseData<BalanceResponseType>, void>({
      query: () => "/balance",
      providesTags: ["balance"],
    }),

    getHistory: build.query<
      ApiResponseData<TransactionResponseType>,
      { offset: number; limit: number }
    >({
      query: ({ limit, offset }) =>
        `/transaction/history?offset=${offset}&limit=${limit}`,
      providesTags: ["history"],
    }),

    postTopUp: build.mutation<
      ApiResponseData<BalanceResponseType>,
      topUpSchemaType
    >({
      query: (topUpValue) => ({
        url: "/topup",
        body: topUpValue,
        method: "POST",
      }),
      invalidatesTags: ["balance", "history"],
    }),

    postCTransaction: build.mutation<
      ApiResponseData<ctResponse>,
      transactionSchemaType
    >({
      query: (transactionValue) => ({
        url: "/transaction",
        body: transactionValue,
        method: "POST",
      }),
      invalidatesTags: ["balance", "history"],
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useGetHistoryQuery,
  usePostCTransactionMutation,
  usePostTopUpMutation,
} = transactionApi;
