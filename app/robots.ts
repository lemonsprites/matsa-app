import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin/", "/superadmin/", "/user/"],
        allow: "/",
      },
    ],
    sitemap: "https://mtsn1ciamis.sch.id/sitemap.xml",
  };
}
