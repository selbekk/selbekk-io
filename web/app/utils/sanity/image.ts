import urlBuilderBuilder from "@sanity/image-url"
import { sanityConfig } from "./config";

export const imageUrlBuilder = urlBuilderBuilder(sanityConfig);