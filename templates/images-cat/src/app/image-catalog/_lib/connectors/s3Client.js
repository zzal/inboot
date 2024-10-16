"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectURI = exports.s3Client = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const sst_1 = require("sst");
exports.s3Client = new client_s3_1.S3Client({});
const getObjectURI = async (objectKey) => {
    const region = await exports.s3Client.config.region();
    return `https://${sst_1.Resource.IonNextAppBucket.name}.s3.${region}.amazonaws.com/${objectKey}`;
};
exports.getObjectURI = getObjectURI;
