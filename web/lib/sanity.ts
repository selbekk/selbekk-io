import { setupNextSanity } from "next-sanity-extra";

// Standard sanity config
// Don't forget token, to get a preview client and authenticated client
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === "production",
};

export const {
  sanityClient,
  imageUrlBuilder,
  PortableText,
  sanityStaticProps,
  useSanityQuery,
} = setupNextSanity(config);
