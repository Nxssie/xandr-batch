import dotenv from 'dotenv'

dotenv.config()
import { Axios } from '../../components/axios.component.js'
import AudienceTemplates from './Templates/AudienceTemplates.js'

const axios = new Axios().instance
const memberId = process.env.XANDR_MEMBER

/* https://api.appnexus.com/universal-pixel/conversion */

export class SegmentPixelService {
  checkAudienceUPById (id) {
    axios.get(`/universal-pixel/audience?universal_pixel_id=${id}`).then(async (res) => {
      console.log(res.data.data[4].rule.and[1])
    })
  }

  createAudienceUPByUUID () {
    let aux = true
    let unique = false
    let templates

    if (!aux && !unique) {
      templates = [AudienceTemplates.allPages, AudienceTemplates.motor1de3, AudienceTemplates.motor2de3, AudienceTemplates.conversion3de3]
    } else if (aux && unique) {
      templates = [AudienceTemplates.uniqueAllPages, AudienceTemplates.uniqueMotor1de3, AudienceTemplates.uniqueMotor2de3, AudienceTemplates.uniqueConversion3de3]
    } else {
      templates = [AudienceTemplates.auxAllPages, AudienceTemplates.auxMotor1de3, AudienceTemplates.auxMotor2de3, AudienceTemplates.auxConversion3de3]
    }

    for (let i = 0; i < templates.length; i++) {
      //console.log(templates[i]);
      axios.post('/universal-pixel/audience', templates[i]).then(async (res) => {
        console.log(res.data)
      })
    }
  }

  findSegment (name) {
    return new Promise((resolve, reject) => {
      axios.get(`/segment?search=${name}`).then((res) => {
        if (res.data.response.segments[0]) {
          resolve(res.data.response.segments[0])
        } else {
          reject('Segment not found')
        }
      })

    })
  }

  createSegment (name) {

    let segment = {
      'segment': {
        'member_id': memberId,
        'short_name': name,
        'code': ''
      }
    }

    return new Promise((resolve, reject) => {
      axios.post(`/segment?member_id=${memberId}`, segment).then((res) => {
        console.log('segment created: ', res.data)
        resolve(res.data)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}