import type { Metadata } from "next";

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  siteName: string;
  image?: string | null;
  keywords?: string[];
};

export function buildPageMetadata({
  title,
  description,
  path,
  siteName,
  image,
  keywords,
}: BuildMetadataInput): Metadata {
  const canonical = path.startsWith("/") ? `https://lugvia.com${path}` : `https://lugvia.com/${path}`;
  const images = image ? [image] : [];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };
}
