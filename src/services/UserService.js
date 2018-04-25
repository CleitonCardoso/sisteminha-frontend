import axios from 'axios'
import Cookies from 'universal-cookie'
import { API_ROOT } from './api-config'

const serverUrl = API_ROOT

const cookies = new Cookies()

export default class UserService {
    listAll = (callback) => {
        var credentials = cookies.get('credentials')
        axios({
            method: 'get',
            url: serverUrl + '/user',
            headers: {
                'Content-Type': 'application/json',
            },
            auth: {
                username: credentials.username,
                password: credentials.password
            }
        }).then(response => {
            callback(response)
        }).catch(error => {
            console.log(error);
        });
    }

    remove = (callback, user) => {
        var credentials = cookies.get('credentials')
        axios({
          method: 'delete',
          url: serverUrl + '/user/' + user.id,
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

      save = (callback, user) => {
        var credentials = cookies.get('credentials')
        axios({
          method: 'post',
          url: serverUrl + '/user',
          headers: {
            'Content-Type': 'application/json'
          },
          auth: {
            username: credentials.username,
            password: credentials.password
          },
          data: user
        })
          .then(response => {
            callback(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
}