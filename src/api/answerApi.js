import axios from 'axios';
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";

export const CreateAnswer = async (profile) => {
  const res = await axios.post(`/api/v1/answers/create_answer`, profile)
  return res.data;
}

export const LoadAnswer = async () => {
  const res = await axios.get(`/api/v1/answers`)
  return res.data;
}

export const DeleteAnswer = async (id_answer) => {
  const res = await axios.delete(`/api/v1/answers/${id_answer}`)
  return res;
}

export const EditAnswer = async (profile, id_answer) => {
  const res = await axios.put(`/api/v1/answers/${id_answer}`, profile)
  return res.data;
}