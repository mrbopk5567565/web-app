import axios from 'axios';
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";

export const CommentOfAnswer = async (id_answer) => {
  const res = await axios.get(`/api/v1/comments/answer/${id_answer}`)
  return res.data;
}

export const PostComment = async (profile) => {
  const res = await axios.post(`/api/v1/comments/comments`, profile)
  return res.data;
}

export const DeteleComment = async (id) => {
  const res = await axios.delete(`/api/v1/comments/delete/${id}`)
  return res.data;
}