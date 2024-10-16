import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inboot",
  description: "Bootstrap project",
};

export default async function Home() {
  return <Link href="image-catalog">Image Catalog Example</Link>;
}
