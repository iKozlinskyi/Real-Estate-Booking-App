import axios from 'axios';
import {APP_NAME, LOGIN_URL, REGISTER_URL, USERNAME_AVAILABLE_BASE_URL} from "../utils/constants";
import {decode} from "jsonwebtoken";

class AuthService {

  register(credentials, successCallback) {
    axios.post(REGISTER_URL, {...credentials})
        .then(res => successCallback(res))
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        })
  }

  async isUsernameAvailable(username) {
    let result;
    let usernameAvailable;

    try {
      result = await axios.get(USERNAME_AVAILABLE_BASE_URL, {params: {username: username}});
      usernameAvailable = result.status === 200;
    } catch (err) {
      usernameAvailable = false;
    }
    return usernameAvailable;
  }

  login(credentials, successCallback, errorCallback) {
    axios.post(LOGIN_URL, {...credentials})
        .then(res => {
          this.saveToken(res.data.token);
          this.setAuthHeader();
        })
        .then(() => successCallback())
        .catch((error) => {
          if (error.response) {
            errorCallback(error.response.data.status)
          }
        })
  }

  saveToken(authHeader) {
    localStorage.setItem(`${APP_NAME}-token`, authHeader.substr(7));
  }

  getToken() {
    return localStorage.getItem(`${APP_NAME}-token`);
  }

  getUsername() {
    const token = this.getToken();

    if (!token) return null;

    const userInfo = decode(token);
    return userInfo.username;
  }

  getAuthHeader() {
    const token = this.getToken();
    if (!token) return null;

    return `Bearer ${token}`
  }


  setAuthHeader() {
    axios.defaults.headers.common['Authorization'] = this.getAuthHeader();
  }

  deleteAuthHeader() {
    delete axios.defaults.headers.common['Authorization'];
  }

  logOut() {
    localStorage.removeItem(`${APP_NAME}-token`);
    delete axios.defaults.headers.common['Authorization'];
  }

  refreshAuthHeader() {
    const authHeader = this.getAuthHeader();

    if (authHeader) {
      this.setAuthHeader();
    } else {
      this.deleteAuthHeader();
    }
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}

export default new AuthService();