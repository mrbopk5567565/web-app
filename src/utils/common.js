// import * as userConstant from '../redux/constants/userConstants'

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
}

export const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  // let color1 = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
    // console.log('color test: ', color)     
  }

  // color1 = Math.floor(Math.random() * 16)
  // console.log('color test1: ', color1)

  return color;
}

export const domain = 'http://172.104.171.131/';

export const ConvertSecToDay = (seconds) => {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}