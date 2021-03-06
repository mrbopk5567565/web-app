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
  return res.data.data;
}

export const DeleteAnswer = async (id_answer) => {
  const res = await axios.delete(`/api/v1/answers/${id_answer}`)
  return res;
}

export const EditAnswer = async (profile, id_answer) => {
  const res = await axios.put(`/api/v1/answers/${id_answer}`, profile)
  return res.data;
}

export const Approve = async (id_answer) => {
  const res = await axios.put(`/api/v1/answers/${id_answer}/approved`)
  return res.data;
}

export const AnswerInternByMentor = async (id_intern) => {
  const res = await axios.get(`/api/v1/answers/${id_intern}/answers`)
  // console.log('res', res)
  return res.data;
}

export const Mark = async (id_answer, profile) => {
  const res = await axios.put(`/api/v1/answers/${id_answer}/mark`, profile)
  return res.data;
}

export const AssignInternToAssignment = async (id_assignment, id_intern) => {
  const res = await axios.put(`/api/v1/answers/assignment/${id_assignment}/assign_intern`, id_intern)
  console.log(res)
}