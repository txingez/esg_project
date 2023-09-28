import axios from "axios";
import {commonConfig} from "./common.js";

const URL = import.meta.env.ENV_BACKEND_URL

export const register = body => {
    return axios.post(`${URL}/auth/sign_up`, body, {})
}

export const login = body => {
    return axios.post(`${URL}/auth/sign_in`, body, {})
}

export const validateToken = token => {
    return axios.post(`${URL}/auth/verify_token?token=${token}`)
}

export const logout = body => {
    return axios.post(`${URL}/auth/sign_out`, body)
}

export const getResetCode = body => {
    return axios.post(`${URL}/auth/password_reset/get_code`, body)
}

export const verifyCode = body => {
    return axios.post(`${URL}/auth/password_reset/verify_code`, body)
}

export const updatePassword = body => {
    return axios.post(`${URL}/auth/reset_password`, body, commonConfig())
}
