import { UniversalPixelService } from '../../services/PixelServices/UniversalPixel.service.js'

const universalService = new UniversalPixelService()

export const getUniversalAudiencesById = async (req, res) => {
  let universalPixelInfo = await universalService.checkUniversalPixelByUUID(req.body.id);

  res.send(universalPixelInfo);
}