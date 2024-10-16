import { Form } from "@/app/image-catalog/_components/form";
import ImagesGridView from "@/app/image-catalog/_components/images-grid-view";

import styles from "@/app/layout.module.css";
import { Suspense } from "react";

export default async function ImageCatalogPage() {
  return (
    <div className={styles.vStack}>
      <Suspense fallback={<p>Getting images…</p>}>
        <ImagesGridView />
      </Suspense>
      <Form />
    </div>
  );
}
