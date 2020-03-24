import axios from 'axios';
let JwtToken = localStorage.token;
axios.defaults.headers.common[`Authorization`] = JwtToken;
axios.defaults.baseURL = "http://172.104.171.131";


export const UserApiLogin = async (user) => {
  try {
    const res = await axios.post("/api/v1/users/sign_in", user)
    if ( res.data.status !== 'error' ){
      localStorage.setItem('user', JSON.stringify(res.data.user))
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
      axios.defaults.headers.common[`Authorization`] = res.data.token;
    }
    return res.data;
  } catch(error){
    console.log(error)
  }
}

export const UserApiLoadUserDetail = async () => {
  const res = await axios.get("/api/v1/users/details")
  return res.data;
}

export const UserApiUpdateUserDetail = async (data_update) => {
  const res = await axios.put("/api/v1/users", data_update)
  return res.data;
}

export const UserApiLoadMentorsName = async (team) => {
  const res = await axios.get(`/api/v1/users/mentors_name?team=${team}`)
  return res.data;
}

export const UserApiSignUp = async (user) => {
  const res = await axios.post('/api/v1/users/sign_up', user);
  return res.data;
}

export const UserApiConfirmUser = async (token) => {
  const res = await axios.get(`/api/v1/users/confirm_user?token=${token}`)
  return res;
}