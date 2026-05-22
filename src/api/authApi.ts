import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import metaEnv from "../env";
import type { ApiResponseData } from "../types/apiResponseData";
import type { loginSchemaType } from "../components/form/validations/loginSchema";
import type { registerSchemaType } from "../components/form/validations/registerSchema";
import { authAction } from "../stores/authState";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: metaEnv.VITE_API_URL }),
    endpoints: (build) => ({
        loginAuth: build.mutation<ApiResponseData<{ token: string }>, loginSchemaType>({
            query: (credential) => ({
                url: "/login",
                body: credential,
                method: "POST"
            }),
            onQueryStarted: async (arg, {dispatch, queryFulfilled }) => {
                try {
                    const {data} = await queryFulfilled

                    const serverToken = data.data.token

                    dispatch(authAction.login(serverToken))

                } catch (error: any) {
                    const errorData = error.error;

                    const serverMessage = errorData?.data?.message || "Something went wrong";
                    console.error(serverMessage);
                }
            }
        }),
        registerAuth: build.mutation<ApiResponseData<null>, registerSchemaType>({
            query: (userInput) => ({
                url: "/registration",
                body: userInput,
                method: "POST"
            })
        })
    })
})

export const { useLoginAuthMutation, useRegisterAuthMutation } = authApi