import axios from 'axios';
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";

export const CreateAssignment = async (profile) => {
  const res = await axios.post('/api/v1/assignments/create_assignment', profile)
  return res.data;
}

export const LoadAssignment = async (page) => {
  const res = await axios.get(`/api/v1/assignments?page=${page}`)
  return res.data;
}

export const EditAssignment = async (id, profile) => {
  const res = await axios.put(`/api/v1/assignments/${id}`, profile)
  return res.data;
}

export const LoadIdAssignment = async (id_assingment) => {
  const res = await axios.get(`/api/v1/assignments/${id_assingment}`)
  return res.data;
}

export const DeleteAssignment = async (id_assingment) => {
  const res = await axios.delete(`/api/v1/assignments/${id_assingment}`)
  return res.data;
}