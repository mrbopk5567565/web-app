import axios from 'axios';
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";

export const loadMentorDetail = async () => {
  const res = await axios.get('/api/v1/interns/mentor')
  return res.data;
}

export const LoadAssignmentOfIntern = async (id_intern) => {
  const res = await axios.get(`/api/v1/interns/${id_intern}/assignments`)
  return res.data;
}