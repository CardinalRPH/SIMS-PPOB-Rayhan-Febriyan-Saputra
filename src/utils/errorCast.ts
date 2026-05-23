import type { ApiResponseData } from "../types/apiResponseData";

const getServerErrorWithStatus = (error: unknown): { message: string; status?: number } | null => {
    if (error && typeof error === "object" && "data" in error) {
        const errorData = error.data as ApiResponseData<null>;
        return {
            message: errorData.message,
            status: errorData.status
        };
    }
    if (error instanceof Error) {
        return { message: error.message };
    }
    return null;
}

export default getServerErrorWithStatus