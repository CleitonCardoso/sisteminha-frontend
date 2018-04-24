import axios from 'axios'
import Cookies from 'universal-cookie'
import { API_ROOT } from './api-config'

const serverUrl = API_ROOT

const cookies = new Cookies()

export default class IncubatorService {
  get = (callback) => {
    var credentials = cookies.get('credentials')

    axios({
      method: 'get',
      url: serverUrl + '/incubator',
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: credentials.username,
        password: credentials.password
      }
    })
      .then(response => {
        callback(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

}
