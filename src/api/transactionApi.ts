import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import metaEnv from "../env";
import type { ApiResponseData } from "../types/apiResponseData";
import type { RootState } from "../stores";
import type { ProfileGetResponseType } from "../dto/membership.dto";
import type { updateProfileSchemaType } from "../components/form/validations/profileSchema";
import type {
  BalanceResponseType,
  TransactionResponseType,
} from "../dto/transaction.dto";
import type {
  topUpSchemaType,
  transactionSchemaType,
} from "../components/form/validations/transactionSchema";

const transactionApi = createApi({
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
    getBalance: build.query<ApiResponseData<BalanceResponseType>, any>({
      query: () => "/balance",
      providesTags: ["balance"],
    }),

    getHistory: build.query<
      ApiResponseData<BalanceResponseType>,
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
      ApiResponseData<TransactionResponseType>,
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
