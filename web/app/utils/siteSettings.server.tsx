import { getClient } from "./sanity/client";

export type SiteSettings = {
  title: string;
  description: string;
  keywords: string[];
};
export const getSiteSettings = async () =>
  getClient().fetch<SiteSettings>(
    `*[_type == "siteSettings"][0] {
        title,
        description,
        keywords,
    }`
  );
