import { Axios } from '../../components/axios.component.js'
import CreativeFolderTemplate from './Templates/CreativeFolderTemplate.js'

const axios = new Axios().instance

export class CreativeFolderService {

  createFolder (advId, folderName, creativesIds) {

    let creativeFolder = CreativeFolderTemplate.default;
    creativeFolder['creative-folder'].name = folderName;
    creativeFolder['creative-folder'].creatives = creativesIds;

    return new Promise((resolve, reject) => {
      axios.post('/creative-folder', creativeFolder, {
        params: {
          advertiser_id: advId
        }
      }).then((res) => {
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getFolder(advId) {
    return new Promise(((resolve, reject) => {
      axios.get('/creative-folder', {
        params: {
          advertiser_id: advId
        }
      }).then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error);
      })
    }))
  }

}