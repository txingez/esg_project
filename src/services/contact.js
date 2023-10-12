import axios from "axios";

const URL = import.meta.env.ENV_BACKEND_URL

export const sendMessage = body => {
	return axios.post(`${URL}/send_message`, body)
}
