import { MetadataRoute } from "next";

export default function generateSitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mtsn1ciamis.schid";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
    },
  ];
}
