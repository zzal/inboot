import { S3Client } from "@aws-sdk/client-s3";
import { Resource } from "sst";

export const s3Client = new S3Client({});

export const getObjectURI = async (objectKey: string): Promise<string> => {
  const region = await s3Client.config.region();
  return `https://${Resource.IonNextAppBucket.name}.s3.${region}.amazonaws.com/${objectKey}`;
};
