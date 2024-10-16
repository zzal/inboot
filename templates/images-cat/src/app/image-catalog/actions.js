"use server";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadLargeImage = uploadLargeImage;
exports.uploadImage = uploadImage;
exports.deleteS3Object = deleteS3Object;
const node_buffer_1 = require("node:buffer");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const s3_presigned_post_1 = require("@aws-sdk/s3-presigned-post");
const cache_1 = require("next/cache");
const sst_1 = require("sst");
require("server-only");
const s3Client_1 = require("@/app/image-catalog/_lib/connectors/s3Client");
const constants_1 = require("./_lib/constants");
const send_multipart_1 = require("./_lib/send-multipart");
async function uploadLargeImage(formData) {
    const file = formData.get("file");
    if (file == null)
        return;
    if (file.size >= constants_1.MAX_FILE_SIZE_POST) {
        throw new Error("File must be smaller than 12Mb to be uploaded");
    }
    const Key = crypto.randomUUID();
    const Fields = { acl: "public-read" };
    const Conditions = [
        Fields,
        { bucket: sst_1.Resource.IonNextAppBucket.name },
        ["content-length-range", 10, constants_1.MAX_FILE_SIZE_POST],
    ];
    const Bucket = sst_1.Resource.IonNextAppBucket.name;
    const presignedPost = await (0, s3_presigned_post_1.createPresignedPost)(s3Client_1.s3Client, {
        Bucket,
        Key,
        Conditions,
        Fields,
        Expires: 600,
    });
    const response = await (0, send_multipart_1.sendMultipart)(presignedPost, file);
    if (response.ok) {
        (0, cache_1.revalidatePath)("/", "page");
    }
    else {
        return await response.text();
    }
}
async function uploadImage(prevState, formData) {
    const file = formData.get("file");
    if (file == null) {
        return { message: "No file provided" };
    }
    if (file.size >= constants_1.MAX_FILE_SIZE_UPLOAD) {
        return { message: "File must be smaller than 6Mb to be uploaded" };
    }
    const uploadCommand = new client_s3_1.PutObjectCommand({
        Key: crypto.randomUUID(),
        Bucket: sst_1.Resource.IonNextAppBucket.name,
    });
    const url = await (0, s3_request_presigner_1.getSignedUrl)(s3Client_1.s3Client, uploadCommand);
    const fileNameBuf = node_buffer_1.Buffer.from(file.name, "latin1");
    try {
        const response = await fetch(url, {
            body: file,
            method: "PUT",
            headers: {
                "Content-Type": file.type,
                "Content-Disposition": `inline; filename*=UTF-8''"${encodeURI(fileNameBuf.toString("utf8"))}"`,
            },
        });
        if (response.ok) {
            (0, cache_1.revalidatePath)("/", "page");
            return { message: "" };
        }
        else {
            const responseText = await response.text();
            return { message: responseText };
        }
    }
    catch (err) {
        return { message: String(err) };
    }
}
async function deleteS3Object(objectKey) {
    const deleteObjectCommand = new client_s3_1.DeleteObjectCommand({
        Bucket: sst_1.Resource.IonNextAppBucket.name,
        Key: objectKey,
    });
    await s3Client_1.s3Client.send(deleteObjectCommand);
    (0, cache_1.revalidatePath)("/", "page");
}
