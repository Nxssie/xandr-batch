import {Axios} from '../../components/axios.component.js';

const axios = new Axios().instance;

export class AdvertiserService {

    findAdvertiser(initials) {
        return new Promise((resolve, reject)=> {
            axios.get(`/advertiser?search=${initials}`).then((res) => {
                resolve(res.data.response['advertisers'][0]['id']);
                return (res.data.response['advertisers'][0]['id']);
            }).catch((error) => {
                reject(error.data);
            })
        })
    }

    getAllActiveAdvertisers() {
        return new Promise((resolve, reject) => {
            return axios.get('/advertiser?state=active').then((res) => {
                let advName = [];
                res.data.response['advertisers'].forEach((adv) => {
                    advName.push(adv['name']);
                })
                resolve(advName)
                return advName
            })
        })
    }
}