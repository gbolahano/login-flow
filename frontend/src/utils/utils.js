import conf from '../config/config';
let jwt

const getToken = () => {
  return JSON.parse(localStorage.getItem(`${conf.tokenName}`));
}

const setToken = (token, expires_in) => {
  const authToken = {
    token
  }
  const userToken = JSON.stringify(authToken);
  localStorage.setItem(`${conf.tokenName}`, userToken);
}

const verifyToken = (token) => {

  try {
    const verified = jwt.verify(token, `${conf.jwtSecret}`);
    return verified;
  } catch (error) {
    console.log(error.message);
    return { error: true };;
  }


}

const config = (token = '') => {
  return  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

const textSnippet = (text) => {
  return text.slice(0, 350) + '...';
}

export {
  getToken,
  setToken,
  verifyToken,
  config,
  textSnippet
}