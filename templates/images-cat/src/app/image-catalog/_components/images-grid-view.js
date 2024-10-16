"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ImagesGridView;
const client_s3_1 = require("@aws-sdk/client-s3");
const sst_1 = require("sst");
const s3Client_1 = require("@/app/image-catalog/_lib/connectors/s3Client");
const show_image_1 = __importDefault(require("@/app/image-catalog/_components/show-image"));
const images_grid_view_module_css_1 = __importDefault(require("./images-grid-view.module.css"));
async function ImagesGridView() {
    const listImagesCommand = new client_s3_1.ListObjectsCommand({
        Bucket: sst_1.Resource.IonNextAppBucket.name,
    });
    const imagesList = await s3Client_1.s3Client.send(listImagesCommand);
    if (imagesList.Contents == null) {
        return <h4>You can upload file.</h4>;
    }
    return (<div className={images_grid_view_module_css_1.default.images}>
      {imagesList.Contents.map((object) => {
            if (object.Key != null) {
                return <show_image_1.default key={object.ETag} objectKey={object.Key}/>;
            }
            return null;
        })}
    </div>);
}
