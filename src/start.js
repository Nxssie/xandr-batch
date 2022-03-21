/**
 * @author Carlos Sánchez nxssiedev@gmail.com
 */

/* Libraries imports && configs */
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import "./database.js";
import { closeConnection } from "./database.js";

import { Axios } from "./components/axios.component.js";

/* Services import */
import { LoginService } from "./services/GeneralServices/Login.service.js";
import { CreativeUploadService } from "./services/CreativeServices/CreativeUpload.service.js";
import { SegmentPixelService } from "./services/PixelServices/SegmentPixel.service.js";
import { ConversionPixelService } from "./services/PixelServices/ConversionPixel.service.js";
import { UniversalPixelService } from "./services/PixelServices/UniversalPixel.service.js";
import { AdvertiserService } from "./services/AdvertiserService/Advertiser.service.js";
import { CreativeActionsService } from "./services/CreativeServices/CreativeActions.service.js";
import { LineItemService } from "./services/LineItemService/LineItem.service.js";
import { CreativeFolderService } from "./services/CreativeServices/CreativeFolder.service.js";
import {
  getToken,
  getTokenUpdateTime,
} from "./routes/token/token.controller.js";
const axios = new Axios().instance;

/* Initialization of services */
const loginService = new LoginService();
const creativeUploadService = new CreativeUploadService();
const conversionPixelService = new ConversionPixelService();
const segmentPixelService = new SegmentPixelService();
const universalPixelService = new UniversalPixelService();
const advertiserService = new AdvertiserService();
const creativeActionsService = new CreativeActionsService();
const lineItemService = new LineItemService();
const creativeFolderService = new CreativeFolderService();

/* Default const */
const uuid = "7112129e-ebe9-442b-854c-bbd76761d534";

/*
        0. testing;
        1. checkUniversalPixelByUUID(uuid);
        2. checkConversionById();
        3. createConversionUPByUUID();
        4. createAudienceUPByUUID();
        5. checkAudienceById();
        6. uploadCreative();
        7. findAdvertiser('FTI').then((id) => { console.log(id) });
        8. updateLineItem(16456951);
        9. findSegment('FTI-FTI-IMPRESSION').then((res) => {console.log(res)})
        10. createFolder(2682205, 'TEST', [{id: 217238072}, {id: 142319005}]).then((res) => {
          console.log(res);
        })
*/
const action = 6;

const testing = async () => {
  await creativeActionsService.detailCreative(322756496)
};

(async () => {
  loginService.apiAuthLogin().then(async () => {
    switch (action) {
      case 0:
        await testing();
        break;
      case 1:
        await universalPixelService.checkUniversalPixelByUUID(uuid);
        break;
      case 2:
        conversionPixelService.checkConversionById();
        break;
      case 3:
        conversionPixelService.createConversionUPByUUID();
        break;
      case 4:
        segmentPixelService.createAudienceUPByUUID();
        break;
      case 5:
        segmentPixelService.checkAudienceUPById();
        break;
      case 6:
        creativeUploadService.uploadCreative();
        break;
      case 7:
        advertiserService.findAdvertiser("TEST").then((id) => {
          console.log(id);
        });
        break;
      case 8:
        lineItemService.updateLineItem(16456951);
        break;
      case 9:
        segmentPixelService.findSegment("FTI-FTI-IMPRESSION").then((res) => {
          console.log(res);
        });
        break;
      case 10:
        creativeFolderService
          .createFolder(2682205, "TEST", [{ id: 217238072 }, { id: 142319005 }])
          .then((res) => {
            console.log(res);
          });
        break;
    }
    await closeConnection();
  });
})();
