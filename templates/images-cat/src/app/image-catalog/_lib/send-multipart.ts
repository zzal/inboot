import { Buffer } from "node:buffer";

import type { PresignedPost } from "@aws-sdk/s3-presigned-post";

export async function sendMultipart(
  { url, fields }: PresignedPost,
  file: File,
) {
  const formData = new FormData();

  Object.entries(fields).forEach(([field, value]) => {
    formData.append(field, value);
  });
  formData.append("ContentType", file.type);

  const fileNameBuf = Buffer.from(file.name, "latin1");
  formData.append("file", file, encodeURI(fileNameBuf.toString("utf8")));
  formData.append("submit", "Upload to Amazon S3");

  return await fetch(url, {
    method: "POST",
    body: formData,
  });
}
