import type { MetadataRoute } from "next";

import { tools } from "@/config/tools";

const baseUrl = "https://paperlab.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((tool) => ({
      url: `${baseUrl}/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: tool.featured ? 0.9 : 0.7,
    })),
  ];
}
