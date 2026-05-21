export type ApiResponseData<T> = {
    status: number
    message: string
    data: T
}