import axios from "axios";
import {commonConfig} from "./common.js";

const URL = import.meta.env.ENV_BACKEND_URL

export const getNewestProfile = (userId, formId) => {
    return axios.get(`${URL}/profile?user_id=${userId}&form_id=${formId}`, commonConfig())
}

export const saveResult = body => {
    return axios.post(`${URL}/save_form`, body, commonConfig())
}

export const getHistories = body => {
    return axios.post(`${URL}/form_history`, body, commonConfig())
}

export const getDetailForm = id => {
    return axios.get(`${URL}/form_detail?id=${id}`, commonConfig())
}

export const downloadDocument = formId => {
    return axios.get(`${URL}/download_file?type=${formId}`, {responseType: 'blob'})
}
