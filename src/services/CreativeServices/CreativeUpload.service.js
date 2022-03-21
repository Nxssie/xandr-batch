import dotenv from "dotenv";
import * as fs from "fs";
import path from "path";

dotenv.config();

import { Axios } from "../../components/axios.component.js";
import { default as FormData } from "form-data";
import { AdvertiserService } from "../AdvertiserService/Advertiser.service.js";
import CreativeHTMLTemplates from "./Templates/CreativeHTMLTemplates.js";
import { SegmentPixelService } from "../PixelServices/SegmentPixel.service.js";
import CreativeSegmentsTemplate from "./Templates/CreativeSegmentsTemplate.js";
import { ChromiumComponent } from "../../components/chromium.component.js";
import { CreativeFolderService } from "./CreativeFolder.service.js";

const axios = new Axios().instance;
const memberId = process.env.XANDR_MEMBER;
const advertiserService = new AdvertiserService();
const segmentService = new SegmentPixelService();
const chromiumComponent = new ChromiumComponent();
const creativeFolderService = new CreativeFolderService();

export class CreativeUploadService {
  adv_id = 0;
  creativesIds = [];
  folderName = "TEST";
  totalCreatives = 0;
  clickUrl;

  uploadCreative = () => {
    fs.readdir("./files", { withFileTypes: true }, (err, dirents) => {
      if (err) {
        throw err;
      }

      const sizes = [
        "320x100",
        "728x90",
        "300x600",
        "300x250",
        "160x600",
        "320x50",
      ];
      const filesNames = dirents
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);
      this.totalCreatives = filesNames.length;

      this.folderName = filesNames[0].match(
        /[0-9]{6}-[A-Z]{3,4}-[A-Z]{3,4}-[A-Z]*-[A-Z]{2}(-[A-Z]{2})?-([A-z]*)([0-9]{0,2})?/
      )[0];

      filesNames.forEach((filename, index) => {
        let fileNameString = filename;
        let file = `./files/${filename}`;
        let type;
        if (fileNameString.match(".zip")) type = "html";
        type == "html"
          ? (file = fs.createReadStream(`./files/${filename}`))
          : (file = fs.createReadStream(`./files/${filename}`));
        if (fileNameString.match(".mp4")) type = "video";
        if (fileNameString.match(".jpeg|.jpg|.gif")) type = "image";
        fileNameString = fileNameString.replace(
          "/.zip|.mp4|.jpeg|.jpg|.gif/g",
          ""
        );
        let initials = fileNameString
          .match(/-[A-Z]{3,4}-/)[0]
          .replaceAll("-", "");
        let creativeName;
        if (filename.match("CAMBIARMEDIDA")) {
          creativeName = fileNameString.replace("CAMBIARMEDIDA", sizes[index]);
        } else {
          creativeName = fileNameString;
        }

        let data = new FormData();
        data.append("file", file);
        data.append("type", type);

        let config = {
          method: "post",
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          url: `https://api.appnexus.com/creative-upload?member_id=${memberId}`,
          headers: {
            ...data.getHeaders(),
          },
          data: data,
        };

        //console.log(config)
        if (this.adv_id === 0) {
          advertiserService.findAdvertiser(initials).then((res) => {
            //console.log(res)
            this.adv_id = res;
            axios(config)
              .then((res) => {
                console.log(res.data.response);
                let id = res.data.response["media-asset"][0].id;
                let cdnUrl = res.data.response["media-asset"][0].cdn_url;
                let cdnSecureUrl = res.data.response["media-asset"][0].cdn_secure_url;
                let type = res.data.response["media-asset"][0].asset_type;
                let duration = res.data.response["media-asset"][0].duration
                //console.log(id, creativeName, initials)
                this.assignToAdvertiser(
                  id,
                  creativeName,
                  initials,
                  type,
                  cdnUrl,
                  cdnSecureUrl,
                  duration
                );
              })
              .catch((error) => {
                console.error("Creative Upload Error: ", error);
              });
          });
        } else if ((this.adv_id !== 0 && this.adv_id != null) || undefined) {
          axios(config)
            .then((res) => {
              //console.log(res.data.response);
              let id = res.data.response["media-asset"][0].id;
              let cdnUrl = res.data.response["media-asset"][0].cdn_url;
              let cdnSecureUrl =
                res.data.response["media-asset"][0].cdn_secure_url;
              let type = res.data.response["media-asset"][0].asset_type;
              type == 'standard' ? type = 'image' : type = type;
              let duration = res.data.response["media-asset"][0].duration;
              console.log("type ", type);
              this.assignToAdvertiser(
                id,
                creativeName,
                initials,
                type,
                cdnUrl,
                cdnSecureUrl,
                duration
              );
            })
            .catch((error) => {
              console.error("Creative Upload Error: ", error);
            });
        }
      });
    });
  };

  assignToAdvertiser = (
    id,
    creativeName,
    initials,
    type,
    cdnUrl,
    cdnSecureUrl,
    duration
  ) => {
    let asset_id = id;
    let advId = this.adv_id;
    let template = CreativeHTMLTemplates.default;
    let videoTemplate = CreativeHTMLTemplates.video;
    let imageTemplate = CreativeHTMLTemplates.image;
    let clickUrl = this.clickUrl ?? "https://adquiver.com";

    let width = creativeName.match(/(\d{2,4})x(\d{2,4})/)[1];
    let height = creativeName.match(/(\d{2,4})x(\d{2,4})/)[2];
    let impressionPixel;
    let clickPixel;

    //console.log('searching segment: ', `${initials}-${initials}-IMPRESSION`);
    segmentService
      .findSegment(`${initials}-${initials}-IMPRESSION`)
      .then((res) => {
        if (res.id) {
          //console.log('Segment: ', res.id, ' found')
          let impressionTemplate = CreativeSegmentsTemplate.impression;
          impressionTemplate.id = res.id;
          impressionTemplate.segment_id = res.id;
          impressionTemplate.name = res.name;

          impressionPixel = impressionTemplate;

          //console.log('searching segment: ', `${initials}-${initials}-CLICK`);
          segmentService
            .findSegment(`${initials}-${initials}-CLICK`)
            .then((res) => {
              if (res.id) {
                //console.log('Segment: ', res.id, ' found')
                let clickTemplate = CreativeSegmentsTemplate.click;
                clickTemplate.id = res.id;
                clickTemplate.segment_id = res.id;
                clickTemplate.name = res.name;

                clickPixel = clickTemplate;
                switch (type) {
                  case "html":
                    console.log("html creative");
                    template["creative-html"].segments = [
                      impressionPixel,
                      clickPixel,
                    ];
                    template["creative-html"].media_assets[0][
                      "media_asset_id"
                    ] = asset_id;
                    template["creative-html"].click_url = clickUrl;
                    template["creative-html"].advertiser_id = advId;
                    template["creative-html"].name = creativeName;
                    template["creative-html"].width = width;
                    template["creative-html"].height = height;
                    template["creative-html"].pixels = [
                      CreativeSegmentsTemplate.third_party,
                    ];
                    break;
                  case "video":
                    console.log("video creative");
                    /* videoTemplate["creative"].segments = [
                      impressionPixel,
                      clickPixel,
                    ]; */
                    videoTemplate["creative"].media_assets[0][
                      "media_asset_id"
                    ] = asset_id;
                    videoTemplate["creative"].video_attribute.duration_ms = duration
                    videoTemplate["creative"].video_attribute.inline.ad_title = creativeName
                    videoTemplate["creative"].click_url = clickUrl;
                    videoTemplate["creative"].advertiser_id = advId;
                    videoTemplate["creative"].name = creativeName;
                    videoTemplate["creative"].width = width;
                    videoTemplate["creative"].height = height;
                    videoTemplate["creative"].media_url = cdnUrl;
                    videoTemplate["creative"].media_url_secure = cdnSecureUrl;
                    videoTemplate["creative"].pixels = [
                      CreativeSegmentsTemplate.third_party,
                    ];
                    break;
                    case "image":
                      imageTemplate["creative"].media_assets[0][
                        "media_asset_id"
                      ] = asset_id;
                      imageTemplate["creative"].click_url = clickUrl;
                      imageTemplate["creative"].advertiser_id = advId;
                      imageTemplate["creative"].name = creativeName;
                      imageTemplate["creative"].width = width;
                      imageTemplate["creative"].height = height;
                      imageTemplate["creative"].media_url = cdnUrl;
                      imageTemplate["creative"].media_url_secure = cdnSecureUrl;
                      imageTemplate["creative"].pixels = [
                        CreativeSegmentsTemplate.third_party,
                      ];
                    break;
                }

                switch (type) {
                  case "html":
                    axios
                      .post(`/creative-html?advertiser_id=${advId}`, template)
                      .then((res) => {
                        let creId = res.data.response.id;
                        this.creativesIds.push({ id: creId });
                        if (this.creativesIds.length === this.totalCreatives) {
                          creativeFolderService
                            .createFolder(
                              advId,
                              this.folderName,
                              this.creativesIds
                            )
                            .then((res) => {
                              console.log(`folder ${this.folderName} created`);
                            });
                        }
                        /* chromiumComponent.passClickTest(advId, creId).then((res) => {
                          console.log(res);
                      }); */
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                    break;
                  case "video":
                    axios
                      .post(`/creative?advertiser_id=${advId}`, videoTemplate)
                      .then((res) => {
                        let creId = res.data.response.id;
                        this.creativesIds.push({ id: creId });
                        if (this.creativesIds.length === this.totalCreatives) {
                          creativeFolderService
                            .createFolder(
                              advId,
                              this.folderName,
                              this.creativesIds
                            )
                            .then((res) => {
                              console.log(`folder ${this.folderName} created`);
                            });
                        }
                        console.log(res.data.response)
                      });
                  case "image":
                    axios
                      .post(`/creative?advertiser_id=${advId}`, imageTemplate)
                      .then((res) => {
                        let creId = res.data.response.id;
                        this.creativesIds.push({ id: creId });
                        if (this.creativesIds.length === this.totalCreatives) {
                          creativeFolderService
                            .createFolder(
                              advId,
                              this.folderName,
                              this.creativesIds
                            )
                            .then((res) => {
                              console.log(`folder ${this.folderName} created`);
                            });
                        }
                        console.log(res.data.response)
                      });
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}
