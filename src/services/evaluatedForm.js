import axios from "axios";

const URL = import.meta.env.ENV_BACKEND_URL

export const getNewestProfile = (userId, formId) => {
    return axios.get(`${URL}/profile?user_id=${userId}&form_id=${formId}`)
}

export const saveResult = (body) => {
    return axios.post(`${URL}/save_form`, body)
}
