import { Axios } from '../../components/axios.component.js'

const axios = new Axios().instance;

export class LineItemService {

  viewLineItem(id) {
    return new Promise((resolve, reject) => {
      axios.get(`/line-item?id=${id}`).then((res)=> {
        resolve(res.data.response);
      }).catch((error) => {
        reject(error);
      });
    })

  }
  updateLineItem(id) {
    this.viewLineItem(id).then((res) => {

      //console.log(res);

      //res['line-item'].revenue_value = 0.17647;

      axios.get(`/pacing-strategy?line_item_id=${res['line-item'].id}`).then((response) => {
        console.log(response.data.response.line_item_strategies[0]);
      })

      /*axios.put(`/line-item?id=${res['line-item'].id}&advertiser_id=${res['line-item'].advertiser_id}`, res).then((response) => {
        console.log('new revenue value:', response.data.response);
      })*/
    })


  }

}