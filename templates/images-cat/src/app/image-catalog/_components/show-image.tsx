"use server";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import sizeOf from "image-size-browser";
import { Resource } from "sst";

import { getObjectURI, s3Client } from "@/app/image-catalog/_lib/connectors/s3Client";
import { ShowImageThumbnail } from "@/app/image-catalog/_components/show-image-thumbnail";

type ShowImageProps = {
  objectKey: string;
};

export default async function ShowImage({ objectKey }: ShowImageProps) {
  const getObjectCommand = new GetObjectCommand({
    Bucket: Resource.IonNextAppBucket.name,
    Key: objectKey,
  });

  const object = await s3Client.send(getObjectCommand);
  if (object.Body == null) {
    return null;
  }
  const imageUri = await getObjectURI(objectKey);

  const content = object.ContentDisposition;
  const match = content != null ? /"(.*)"$/.exec(content) : "";
  const alt = match == null ? "" : match[1];


  const uInt8Array = await object.Body.transformToByteArray();
  const size = sizeOf(uInt8Array);

  return <ShowImageThumbnail imageKey={objectKey} url={imageUri} alt={alt} width={size.width} height={size.height} />;
}
