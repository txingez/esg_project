import axios from "axios";
import {commonConfig} from "./common.js";

const URL = import.meta.env.ENV_BACKEND_URL

export const getNewestProfile = (userId, formId) => {
    return axios.get(`${URL}/profile?user_id=${userId}&form_id=${formId}`, commonConfig())
}

export const saveResult = (body) => {
    return axios.post(`${URL}/save_form`, body, commonConfig())
}
