import axios from "axios";
import {headers} from "./common.js";

const URL = import.meta.env.ENV_BACKEND_URL
const config = {headers: headers()}

export const getNewestProfile = (userId, formId) => {
    return axios.get(`${URL}/profile?user_id=${userId}&form_id=${formId}`, config)
}

export const saveResult = (body) => {
    return axios.post(`${URL}/save_form`, body, config)
}
