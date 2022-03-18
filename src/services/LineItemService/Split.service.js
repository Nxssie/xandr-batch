import { Axios } from '../../components/axios.component.js'

const axios = new Axios().instance

export class SplitService {
  listAllSplitsByLineItemId (lineItemId) {
    return new Promise((resolve, reject) => {
      axios.get(`/budget-splitter/${lineItemId}/splits`).then((res) => {
        console.log(res.data)
      })
    })
  }
}

;(() => {

})()
