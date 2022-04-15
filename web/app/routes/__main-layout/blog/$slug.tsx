import {
  Box,
  Container,
  Heading,
  Image,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import groq from "groq";
import React from "react";
import readingTime from "reading-time";
import type { HeadersFunction, LoaderFunction, MetaFunction } from "remix";
import { json, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { TextLink } from "~/features/design-system/TextLink";
import { PortableText } from "~/features/portable-text/PortableText";
import { getClient } from "~/utils/sanity/client";
import { imageUrlBuilder } from "~/utils/sanity/image";

type BlogPostDetail = {
  title: string;
  slug: { current: string };
  canonicalUrl?: string;
  mainImage: any;
  excerpt: any;
  textExcerpt: string;
  body: any;
  textBody: string;
  publishedAt: any;
};

type LoaderData = {
  post: BlogPostDetail;
};
export const loader: LoaderFunction = async ({ params }) => {
  invariant(
    params.slug,
    "slug is a required part of the URL. Make sure the route is named with $slug"
  );
  const post = await getClient().fetch<BlogPostDetail>(
    groq`*[_type == "post" && slug.current == $slug][0] {
    slug,
    canonicalUrl,
    title,
    excerpt,
    "textExcerpt": pt::text(excerpt),
    publishedAt,
    mainImage,
    body,
    "textBody": pt::text(body)
    }`,
    { slug: params.slug }
  );
  if (!post) {
    throw new Response("Article not found", { status: 404 });
  }
  return json({ post });
};

export const meta: MetaFunction = ({ data }) => {
  if (!data) {
    return {};
  }
  const { post } = data as LoaderData;
  const metadata: Record<string, string> = {
    title: `${post.title} - selbekk.io`,
    description: `${post.textExcerpt}`,
    "og:image": imageUrlBuilder
      .image(post.mainImage)
      .width(1200)
      .height(627)
      .fit("crop")
      .format("webp")
      .url(),
    "og:image:width": "1200",
    "og:image:height": "627",
    "og:type": "article",
    "og:author": "Kristofer Giltvedt Selbekk",
  };
  if (post.canonicalUrl) {
    metadata.canonical = post.canonicalUrl;
  }
  return metadata;
};

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=360, stale-while-revalidate=3600",
  };
};

const getImageUrlForSize = (size: number, image: any) =>
  imageUrlBuilder.image(image).width(size).fit("crop").format("webp").url();

export default function BlogPage() {
  const { post } = useLoaderData<LoaderData>();
  const canonicalBackground = useColorModeValue("gray.100", "black");
  const textLength = React.useMemo(
    () => readingTime(post.textBody).text,
    [post.textBody]
  );
  return (
    <Box>
      <Image
        src={getImageUrlForSize(1800, post.mainImage)}
        srcSet={`${getImageUrlForSize(320, post.mainImage)} 320w,
          ${getImageUrlForSize(640, post.mainImage)} 640w,
          ${getImageUrlForSize(1200, post.mainImage)} 1200w,
          ${getImageUrlForSize(1800, post.mainImage)},`}
        sizes={`
          (max-width: 320px) 320px,
          (max-width: 640px) 640px,
          (max-width: 1200px) 1200px,
          1800px`}
        fallbackSrc={imageUrlBuilder
          .image(post.mainImage)
          .width(20)
          .height(13)
          .blur(50)
          .format("webp")
          .url()}
        alt={post.title}
        width="100%"
        __css={{ aspectRatio: 4 / 3 }}
        maxWidth="1800px"
        mx="auto"
        height="auto"
        maxHeight="600px"
        objectFit="cover"
        objectPosition="center center"
        mb={[3, 6, 9]}
      />
      <Container maxWidth="2xl">
        <Heading as="h2" fontSize={["4xl", "3rem"]}>
          {post.title}
        </Heading>
        <Box color="gray.800" mb={2}>
          <Stack direction="row" spacing={8}>
            <Box>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </Box>
            <Box>{textLength}</Box>
          </Stack>
        </Box>
        {post.canonicalUrl && (
          <Box
            p={3}
            mt={6}
            borderRadius="md"
            backgroundColor={canonicalBackground}
          >
            Originally published at{" "}
            <TextLink href={post.canonicalUrl}>
              {new URL(post.canonicalUrl).hostname}
            </TextLink>
          </Box>
        )}
        <Box fontSize="xl" mt={4} mb={8}>
          <PortableText blocks={post.excerpt} />
        </Box>
      </Container>
      <Container maxWidth="80ch">
        <PortableText blocks={post.body} />
      </Container>
    </Box>
  );
}
