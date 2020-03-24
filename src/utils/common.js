// import * as userConstant from '../redux/constants/userConstants'
import axios from 'axios';

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}

export const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  // let color1 = '#';

  for (let i = 0; i < 6; i++){
      color += letters[Math.floor(Math.random() * 16)]
      // console.log('color test: ', color)     
  }

  // color1 = Math.floor(Math.random() * 16)
  // console.log('color test1: ', color1)

  return color;
}

export const domain = 'http://172.104.171.131/';