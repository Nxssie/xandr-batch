import { CreativeUploadService } from "../../services/CreativeServices/CreativeUpload.service"

const creativeUploadService = new CreativeUploadService();

export const uploadCreative = (req, res) => {
    creativeUploadService.uploadCreative();
}