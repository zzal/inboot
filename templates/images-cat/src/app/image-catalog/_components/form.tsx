"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useActionState } from "react";
import sizeOf from "image-size-browser";

import { initialUploadImageState } from "@/app/image-catalog/_lib/constants";
import { uploadImage } from "@/app/image-catalog/actions";

import styles from "./form.module.css";
import { SubmitButton } from "./form-submit-button";

import type { FC } from "react";
import type { UploadImageState } from "@/app/image-catalog/_lib/constants";

export const Form: FC = () => {
  const [state, submitAction, isPending] = useActionState<
    UploadImageState,
    FormData
  >(uploadImage, initialUploadImageState, "/image-catalog");
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasFile, setHasFile] = useState(false);
  const [fileType, setFileType] = useState("");
  const [fileWidth, setFileWidth] = useState(Number.NaN);
  const [fileHeight, setFileHeight] = useState(Number.NaN);

  const resetStates = () => {
    setHasFile(false);
    setFileType("");
    setFileWidth(Number.NaN);
    setFileHeight(Number.NaN);
  }

  const onSubmitHandler = useCallback((event: Event) => {
    const form = event.target as HTMLFormElement;
    setTimeout(() => {
      form.reset();
      resetStates();
    }, 100);
  }, []);

  useEffect(() => {
    if (inputRef.current != null) {
      const form = inputRef.current.form;
      if (form != null) {
        form.removeEventListener("formdata", onSubmitHandler);
        form.addEventListener("formdata", onSubmitHandler);
      }
    }
  }, [onSubmitHandler]);

  return (
    <form action={submitAction}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className={styles.form}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input type="hidden" name="fileName" />
            <input
              ref={inputRef}
              name="file"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              multiple={false}
              disabled={isPending}
              onInput={(evt) => {
                const form = (evt.target as HTMLInputElement).form;
                if (form != null) {
                  const file = form.file.files[0] as unknown as File;
                  if (file) {
                    setHasFile(true);
                    setFileType(file.type);
                    file.arrayBuffer().then((buffer) => {
                      const size = sizeOf(new Uint8Array(buffer));
                      setFileWidth(() => size.width ?? Number.NaN);
                      setFileHeight(() => size.height ?? Number.NaN);
                    });
                  }
                }
              }}
            />
            {hasFile ? (
              <>
                <p>Type: {fileType}</p>
                {Number.isNaN(fileWidth) ? null : <p>Width: {fileWidth}px</p>}
                {Number.isNaN(fileHeight) ? null : (
                  <p>Height: {fileHeight}px</p>
                )}
              </>
            ) : null}
          </div>
          <SubmitButton hasFile={hasFile} />
        </div>
        {state.message === "" || hasFile || isPending ? null : (
          <p style={{ color: "orangered" }}>{state.message}</p>
        )}
      </div>
    </form>
  );
};
