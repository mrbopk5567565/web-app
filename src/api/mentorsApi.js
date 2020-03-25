import axios from 'axios';
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";

export const LoadInterns = async (page) => {
  const res = await axios.get(`/api/v1/mentors/interns?page=${page}`)
  return res.data;
}

// &order_by=id&order=asc