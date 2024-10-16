"use server";

import { Buffer } from "node:buffer";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import type { PresignedPostOptions } from "@aws-sdk/s3-presigned-post/dist-types";
import { revalidatePath } from "next/cache";
import { Resource } from "sst";

import "server-only";

import { s3Client } from "@/app/image-catalog/_lib/connectors/s3Client";

import {
  MAX_FILE_SIZE_POST,
  MAX_FILE_SIZE_UPLOAD,
  UploadImageState,
} from "./_lib/constants";
import { sendMultipart } from "./_lib/send-multipart";

export async function uploadLargeImage(formData: FormData) {
  const file = formData.get("file") as File;

  if (file == null) return;

  if (file.size >= MAX_FILE_SIZE_POST) {
    throw new Error("File must be smaller than 12Mb to be uploaded");
  }
  const Key: PresignedPostOptions["Key"] = crypto.randomUUID();
  const Fields: PresignedPostOptions["Fields"] = { acl: "public-read" };
  const Conditions: PresignedPostOptions["Conditions"] = [
    Fields,
    { bucket: Resource.IonNextAppBucket.name },
    ["content-length-range", 10, MAX_FILE_SIZE_POST],
  ];
  const Bucket: PresignedPostOptions["Bucket"] = Resource.IonNextAppBucket.name;

  const presignedPost = await createPresignedPost(s3Client, {
    Bucket,
    Key,
    Conditions,
    Fields,
    Expires: 600,
  });
  const response = await sendMultipart(presignedPost, file);
  if (response.ok) {
    revalidatePath("/", "page");
  } else {
    return await response.text();
  }
}

export async function uploadImage(
  prevState: UploadImageState,
  formData: FormData,
) {
  const file = formData.get("file") as File;

  if (file == null) {
    return { message: "No file provided" };
  }

  if (file.size >= MAX_FILE_SIZE_UPLOAD) {
    return { message: "File must be smaller than 6Mb to be uploaded" };
  }
  const uploadCommand = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.IonNextAppBucket.name,
  });
  const url = await getSignedUrl(s3Client, uploadCommand);

  const fileNameBuf = Buffer.from(file.name, "latin1");
  try {
    const response = await fetch(url, {
      body: file,
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Disposition": `inline; filename*=UTF-8''"${encodeURI(
          fileNameBuf.toString("utf8"),
        )}"`,
      },
    });

    if (response.ok) {
      revalidatePath("/", "page");
      return { message: "" };
    } else {
      const responseText = await response.text();
      return { message: responseText };
    }
  } catch (err) {
    return { message: String(err) };
  }
}

export async function deleteS3Object(objectKey: string) {
  const deleteObjectCommand = new DeleteObjectCommand({
    Bucket: Resource.IonNextAppBucket.name,
    Key: objectKey,
  });

  await s3Client.send(deleteObjectCommand);

  revalidatePath("/", "page");
}
