import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import * as tokenCtrl from '../routes/token/token.controller.js'
import { getToken } from '../routes/token/token.controller.js'

let token = await getToken()

export class Axios {

    instance = axios.create({
        baseURL: 'https://api.appnexus.com',
        headers: {
            'Authorization': token
        }
    });
}