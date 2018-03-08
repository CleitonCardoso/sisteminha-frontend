import axios from 'axios'
import Cookies from 'universal-cookie'

const serverUrl = 'http://localhost:8080'

const cookies = new Cookies()

export default class TenantService {
  listAll = callback => {
    var credentials = cookies.get('credentials')

    axios({
      method: 'get',
      url: serverUrl + '/tenant',
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

  remove = (callback, tenant) => {
    var credentials = cookies.get('credentials')
    console.log(callback)
    console.log(tenant)
    axios({
      method: 'delete',
      url: serverUrl + '/tenant/' + tenant.id,
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
