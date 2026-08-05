import type { MetadataRoute } from "next";
import { canonical } from "../lib/site";

// Emitted as a static robots.txt under `output: "export"`.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${canonical("/")}sitemap.xml`,
  };
}
