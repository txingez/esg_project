import axios from "axios";

const URL = import.meta.env.ENV_BACKEND_URL

export const getPosts = (pageId, limit, offset, category) => {
    return axios.get(`${URL}/posts?page_id=${pageId}&limit=${limit}&offset=${offset}${category ? `&category=${category}` : ''}`)
}

export const searchPosts = body => {
    return axios.post(`${URL}/search`, body)
}

export const getPost = postId => {
    return axios.get(`${URL}/post_detail?id=${postId}`)
}
