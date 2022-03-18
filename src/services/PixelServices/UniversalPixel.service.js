import dotenv from 'dotenv';
dotenv.config();

import {Axios} from '../../components/axios.component.js';

const axios = new Axios().instance;

export class UniversalPixelService {
    async checkUniversalPixelByUUID(id) {
        return await axios.get(`/universal-pixel/pixel-uuid/${id}`).then(async (res) => {
            return res.data
        });
    }
}