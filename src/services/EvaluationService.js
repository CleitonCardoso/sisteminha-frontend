import axios from 'axios'
import Cookies from 'universal-cookie'
import { API_ROOT } from './api-config'

const serverUrl = API_ROOT

const cookies = new Cookies()

export default class EvaluationsService {
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

  listAllForTenant = (callback, tenant) => {
    var credentials = cookies.get('credentials')

    axios({
      method: 'get',
      url: serverUrl + '/tenant/' + tenant + '/evaluations',
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

  addTenantInEvaluation = (callback, tenant, evaluation) => {
    var credentials = cookies.get('credentials')
    axios({
      method: 'post',
      url: serverUrl + '/tenant/' + tenant + '/evaluation/' + evaluation.id,
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
