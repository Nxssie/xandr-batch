import {AdvertiserService} from '../../services/AdvertiserService/Advertiser.service.js'

const advertiserService = new AdvertiserService()

export const getAllActiveAdv = async (req, res) => {
  let advertiserInfo = await advertiserService.getAllActiveAdvertisers();

  res.send(advertiserInfo);
}