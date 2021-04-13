import { setupNextSanity } from "next-sanity-extra";

// Standard sanity config
// Don't forget token, to get a preview client and authenticated client
const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === "production",
};

/** Turn block content into regular old text
 *
 * Ignores non-text content
 */
export const blocksToText = (blocks: any, opts = {}) => {
  return blocks
    .map((block: any) => {
      if (block._type !== "block" || !block.children) {
        return "";
      }

      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
};

export const {
  sanityClient,
  imageUrlBuilder,
  PortableText: BasePortableText,
  sanityStaticProps,
  useSanityQuery,
} = setupNextSanity(config);
