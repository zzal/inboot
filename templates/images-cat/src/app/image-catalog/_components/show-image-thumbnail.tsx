"use client";

import type { FC, MouseEventHandler } from "react";

import { deleteS3Object } from "@/app/image-catalog/actions";

import styles from "./images-grid-view.module.css";

export type ShowImageThumbnailProps = {
  imageKey: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export const ShowImageThumbnail: FC<ShowImageThumbnailProps> = ({
  imageKey,
  url,
  alt,
  width,
  height,
}) => {
  const imageName = decodeURI(alt);
  const clickHandler: MouseEventHandler<HTMLButtonElement> = (evt) => {
    evt.preventDefault();
    if (window.confirm(`Delete image: ${imageName}?`)) {
      void deleteS3Object(imageKey);
    }
  };

  /* eslint-disable @next/next/no-img-element */
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <img
        src={url}
        title={imageName}
        alt={imageName}
        className={styles.thumbnail}
        width={120}
        height={120}
      />
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: "x-small", margin: 0 }}>
            width: {width ?? "? "}px
            <br />
            height: {height ?? "? "}px
          </p>
        </div>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={clickHandler}
        >
          ␡
        </button>
      </div>
    </div>
  );
  /* eslint-enable @next/next/no-img-element */
};
