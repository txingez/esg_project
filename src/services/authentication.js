import axios from "axios";

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

export const logout = () => {
    return axios.post(`${URL}/auth/sign_out`)
}
