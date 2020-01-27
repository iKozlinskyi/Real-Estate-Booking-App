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

  login(credentials, successCallback) {
    axios.post(LOGIN_URL, {...credentials})
        .then(res => {
          this.saveToken(res.data.token);
          this.setAuthHeader();
        })
        .then(() => successCallback())
  }

  saveToken(authHeader) {
    localStorage.setItem(`${APP_NAME}-token`, authHeader.substr(7));
  }

  getToken() {
    return localStorage.getItem(`${APP_NAME}-token`);
  }

  getUsername() {
    const userInfo = decode(this.getToken());
    return userInfo.username;
  }

  getAuthHeader() {
    return `Bearer ${this.getToken()}`;
  }

  setAuthHeader() {
    axios.defaults.headers.common['Authorization'] = this.getAuthHeader();
  }

  logOut() {
    localStorage.removeItem(`${APP_NAME}-token`);
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default new AuthService();