"use server";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ShowImage;
const client_s3_1 = require("@aws-sdk/client-s3");
const image_size_browser_1 = __importDefault(require("image-size-browser"));
const sst_1 = require("sst");
const s3Client_1 = require("@/app/image-catalog/_lib/connectors/s3Client");
const show_image_thumbnail_1 = require("@/app/image-catalog/_components/show-image-thumbnail");
async function ShowImage({ objectKey }) {
    const getObjectCommand = new client_s3_1.GetObjectCommand({
        Bucket: sst_1.Resource.IonNextAppBucket.name,
        Key: objectKey,
    });
    const object = await s3Client_1.s3Client.send(getObjectCommand);
    if (object.Body == null) {
        return null;
    }
    const imageUri = await (0, s3Client_1.getObjectURI)(objectKey);
    const content = object.ContentDisposition;
    const match = content != null ? /"(.*)"$/.exec(content) : "";
    const alt = match == null ? "" : match[1];
    const uInt8Array = await object.Body.transformToByteArray();
    const size = (0, image_size_browser_1.default)(uInt8Array);
    return <show_image_thumbnail_1.ShowImageThumbnail imageKey={objectKey} url={imageUri} alt={alt} width={size.width} height={size.height}/>;
}
