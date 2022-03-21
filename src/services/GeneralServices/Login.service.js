import dotenv from 'dotenv'

dotenv.config()
import { Axios } from '../../components/axios.component.js'
import * as TokenController from '../../routes/token/token.controller.js'
import { getToken } from '../../routes/token/token.controller.js'

const axios = new Axios().instance

const user = process.env.XANDR_USER
const password = process.env.XANDR_PASS

export class LoginService {

  apiAuthLogin () {
    return new Promise((resolve, reject) => {
      getToken().then(() => {
        axios.get('/member')
          .then(async (res) => {
            //⚠️ DEV PURPOSES ⚠️
            if (process.env.ENV === 'DEV') {
              console.log(res.data.response.status)
            }
            resolve('Previously logged in.')
          }).catch(async (error) => {
          if (error) {
            await axios.post('/auth', {
              'auth': {
                'username': user,
                'password': password
              }
            }).then(async (res) => {
              //⚠️ DEV PURPOSES ⚠️
              if (process.env.ENV === 'DEV') {
                console.log(res.data.response.token)
              }
              await TokenController.updateToken(res.data.response.token)
              resolve('Succesfully logged in')
            })
          } else {
            reject(error)
          }
        })
      }).catch(async (error) => {
        await TokenController.createToken('test')
        console.log('test')
      })
    })
  }
}