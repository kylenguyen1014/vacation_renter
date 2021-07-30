import { AxiosError } from "axios"

export const errorMessageReturn = (error : AxiosError) => {
    if (error.message) {
        return error.message
    }
    
    if (error.request === undefined || error.response === undefined) {
        return 'Network Error'
    }

    if (error.response && error.response.data) {
        return JSON.stringify(error.response.data).slice(0, 100) + '...'
    }

    return error.message
}

