import axios from "axios";

const URL = import.meta.env.ENV_BACKEND_URL

export const getPosts = (pageId, limit, offset) => {
    return axios.get(`${URL}/posts?page_id=${pageId}&limit=${limit}&offset=${offset}`)
}

export const searchPosts = body => {
    return axios.post(`${URL}/search`, body)
}
