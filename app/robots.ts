import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/superadmin/", "/user/", "/api/"],
        allow: "/",
      },
    ],
    sitemap: "https://www.mtsn1ciamis.sch.id/sitemap.xml",
    host: "https://www.mtsn1ciamis.sch.id/"
  };
}
