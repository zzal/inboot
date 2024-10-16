import { ListObjectsCommand } from "@aws-sdk/client-s3";

import { Resource } from "sst";

import { s3Client } from "@/app/image-catalog/_lib/connectors/s3Client";
import ShowImage from "@/app/image-catalog/_components/show-image";

import styles from "./images-grid-view.module.css";

export default async function ImagesGridView() {
  const listImagesCommand = new ListObjectsCommand({
    Bucket: Resource.IonNextAppBucket.name,
  });

  const imagesList = await s3Client.send(listImagesCommand);

  if (imagesList.Contents == null) {
    return <h4>You can upload file.</h4>;
  }

  return (
    <div className={styles.images}>
      {imagesList.Contents.map((object) => {
        if (object.Key != null) {
          return <ShowImage key={object.ETag} objectKey={object.Key} />;
        }
        return null;
      })}
    </div>
  );
}
