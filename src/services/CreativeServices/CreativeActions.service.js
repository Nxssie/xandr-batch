import { Axios } from '../../components/axios.component.js'
import { ChromiumComponent } from '../../components/chromium.component.js'

const axios = new Axios().instance
const chromiumComponent = new ChromiumComponent();

export class CreativeActionsService {

  detailCreative (id) {
    return new Promise((resolve, reject) => {
      axios.get(`/creative?id=${id}`)
        .then((res) => {
          console.log(res.data.response)
          console.log(res.data.response.creative.video_attribute)
          resolve(res.data.response)
        }).catch((error) => {
        reject(error)
      })
    })
  }

  redoCreativeClick(ids) {
    if(typeof ids === 'object') {
      ids.forEach((id) => {
        this.detailCreative(id).then((res) => {
          if(res.click_track_result === "not_tested") {
            chromiumComponent.passClickTest(res.advertiser_id, res.id).then((res)=> {
              console.log(res);
            })
          }
        })
      })
    } else if (typeof ids === 'number') {
      this.detailCreative(ids).then((res) => {
        chromiumComponent.passClickTest(res.advertiser_id, res.id).then((res) => {
          console.log(res);
        })
      });
    } else {
      throw 'id param must be a Number or an Object containing creative ids (numbers)'
    }
  }

}