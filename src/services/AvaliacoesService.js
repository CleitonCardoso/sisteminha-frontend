import axios from 'axios'
import Cookies from 'universal-cookie'

const serverUrl = 'http://localhost:8080'

const cookies = new Cookies()

export default class AvaliacoesService {
  listAll = callback => {
    var credentials = cookies.get('credentials')

    axios({
      method: 'get',
      url: serverUrl + '/evaluation',
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

  remove = (callback, evaluation) => {
    var credentials = cookies.get('credentials')
    axios({
      method: 'delete',
      url: serverUrl + '/evaluation/' + evaluation.id,
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

  get = (callback, evaluation) => {
    var credentials = cookies.get('credentials')
    axios({
      method: 'get',
      url: serverUrl + '/evaluation/' + evaluation.id,
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

  save = (callback, evaluation) => {
    var credentials = cookies.get('credentials')
    axios({
      method: 'post',
      url: serverUrl + '/evaluation',
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      data: evaluation
    })
      .then(response => {
        callback(response)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
