import axios from 'axios';
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";

export const CreateAssignment = async (profile) => {
  const res = await axios.post('/api/v1/assignments/create_assignment', profile)
  console.log('res assignment', res)
  return res.data;
}