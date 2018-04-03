import axios from 'axios'
import Cookies from 'universal-cookie'
import { API_ROOT } from './api-config'

const serverUrl = API_ROOT

const cookies = new Cookies()

export default class QuestionsService {
  listAll = (callback, evaluation) => {
    var credentials = cookies.get('credentials')

    axios({
      method: 'get',
      url: serverUrl + '/evaluation/' + evaluation.id + '/questions',
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

  save = (callback, evaluation, question) => {
    var credentials = cookies.get('credentials')

    axios({
      method: 'post',
      url: serverUrl + '/evaluation/' + evaluation.id + '/question',
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: credentials.username,
        password: credentials.password
      },
      data: question
    })
      .then(response => {
        callback(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  remove = (question, callback) => {
    var credentials = cookies.get('credentials')
    axios({
      method: 'delete',
      url: serverUrl + '/evaluation/' + question.id + '/question',
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
