import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authState"
import { authApi } from "../api/authApi";
import { infomationApi } from "../api/informationApi";
import { profileApi } from "../api/profileApi";
import { transactionApi } from "../api/transactionApi";

const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [infomationApi.reducerPath]: infomationApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        [transactionApi.reducerPath]: transactionApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(infomationApi.middleware)
            .concat(profileApi.middleware)
            .concat(transactionApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;

export default store