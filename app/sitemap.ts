import { MetadataRoute } from "next";

export default function generateSitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mtsn1ciamis.sch.id";

  return [
    {
      url: `${baseUrl}/`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
      changeFrequency: 'never',
      videos: [
        {
          title: 'Selayang Pandang',
          thumbnail_loc: 'https://i.ytimg.com/vi_webp/SbBGXt9sW2s/sddefault.webp',
          description: 'Video selayang pandang MTsN 1 Ciamis',
        },
      ],
    },
    {
      url: `${baseUrl}/profil`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/pendidik`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/kinerja`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/struktur`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/integritas`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/masuk`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/artikel`,
      priority: 0.5,
      lastModified: new Date().toISOString(),
    },
  ];
}
