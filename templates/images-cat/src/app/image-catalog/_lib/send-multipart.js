"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMultipart = sendMultipart;
const node_buffer_1 = require("node:buffer");
async function sendMultipart({ url, fields }, file) {
    const formData = new FormData();
    Object.entries(fields).forEach(([field, value]) => {
        formData.append(field, value);
    });
    formData.append("ContentType", file.type);
    const fileNameBuf = node_buffer_1.Buffer.from(file.name, "latin1");
    formData.append("file", file, encodeURI(fileNameBuf.toString("utf8")));
    formData.append("submit", "Upload to Amazon S3");
    return await fetch(url, {
        method: "POST",
        body: formData,
    });
}
