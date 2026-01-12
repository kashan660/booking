import { SEOPageTemplate } from "@/components/features/SEOPageTemplate";
import { seoPagesData } from "@/lib/seo-data";
import { Metadata } from "next";

const key = "city-transfers-makkah-madina";
const data = seoPagesData[key];

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
};

export default function Page() {
  return <SEOPageTemplate {...data} />;
}
