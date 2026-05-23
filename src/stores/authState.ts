import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    token: string;
}

const getAuthLocalStorage = (): AuthState => {
    const getLocalStorage = localStorage.getItem("authentication");

    if (!getLocalStorage) {
        return { isAuthenticated: false, token: "" };
    }

    try {
        const { isAuthenticated, token } = JSON.parse(getLocalStorage);
        return {
            isAuthenticated: !!isAuthenticated,
            token: token || ""
        };
    } catch (error) {
        return { isAuthenticated: false, token: "" };
    }
};

const saveAuthLocalStorage = (isAuthenticated: boolean, token: string): void => {
    const authentication: AuthState = { isAuthenticated, token };
    localStorage.setItem("authentication", JSON.stringify(authentication));
};


const removeAuthLocalStorage = (): void => {
    localStorage.removeItem("authentication");
};

const initialState: AuthState = getAuthLocalStorage();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<string>) {
            console.log("dddd")
            state.isAuthenticated = true;
            state.token = action.payload;
            saveAuthLocalStorage(true, state.token);
        },
        logout(state) {
            state.isAuthenticated = false;
            state.token = "";
            removeAuthLocalStorage();
        },
    },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;