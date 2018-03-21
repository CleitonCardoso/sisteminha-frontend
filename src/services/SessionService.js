import axios from 'axios'
import Cookies from 'universal-cookie'
import { API_ROOT } from './api-config'

const serverUrl = API_ROOT

const cookies = new Cookies()

// Fazer corretamente esse service algum dia
export default class SessionService {
  login = (username, password, successCallback, errorCallback) => {
    let data = 'username=' + username + '&password=' + password
    axios({
      method: 'post',
      url: serverUrl,
      data: data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        if (res.status === 200) {
          cookies.set(
            'credentials',
            {
              username: username,
              password: password
            },
            { path: '/' }
          )
          successCallback()
        }
      })
      .catch(error => {
        console.log(error)
        errorCallback()
      })
  }
}
