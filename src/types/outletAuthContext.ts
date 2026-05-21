import type { Dispatch, SetStateAction } from "react"

export type outletAuthContext = {
    setToastErr: Dispatch<SetStateAction<{ message: string, type: 'success' | 'error'; } | null>>
}