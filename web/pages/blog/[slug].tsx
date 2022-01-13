import { HStack, Text } from "@chakra-ui/layout";
import {
  Box,
  Container,
  Heading,
  Image,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import groq from "groq";
import { GetStaticPaths, GetStaticProps } from "next";
import { SanityProps } from "next-sanity-extra";
import React from "react";
import readingTime from "reading-time";
import { TextLink } from "../../features/design-system/TextLink";
import {
  BlogPostPortableText,
  PortableText,
} from "../../features/portable-text/PortableText";
import { Seo } from "../../features/seo/Seo";
import { SiteFooter } from "../../features/site-footer/SiteFooter";
import { SiteHeader } from "../../features/site-header/SiteHeader";
import {
  blocksToText,
  imageUrlBuilder,
  sanityClient,
  sanityStaticProps,
} from "../../lib/sanity";

type BlogPostDetail = {
  title: string;
  slug: { current: string };
  canonicalUrl?: string;
  mainImage: any;
  excerpt: any;
  body: any;
  publishedAt: any;
};
export const getStaticProps: GetStaticProps = async (context) => ({
  props: await sanityStaticProps({
    context,
    query: groq`*[_type == "post" && slug.current == $slug][0] {
    slug,
    canonicalUrl,
    title,
    excerpt,
    publishedAt,
    mainImage,
    body
  }`,
    params: { slug: context.params!.slug },
  }),
  revalidate: 60,
});

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await sanityClient("anonymous")
    .fetch(groq`*[_type == "post"] {
    slug
  }`);
  const paths = results.map((result: any) => `/blog/${result.slug.current}`);
  return {
    paths,
    fallback: "blocking",
  };
};

function BlogPage({ data: post }: SanityProps<BlogPostDetail>) {
  const canonicalBackground = useColorModeValue("gray.100", "black");
  const textExcerpt = React.useMemo(
    () => blocksToText(post.excerpt),
    [post.excerpt]
  );
  const textLength = React.useMemo(
    () => readingTime(blocksToText(post.body)).text,
    [post.body]
  );
  return (
    <Box>
      <SiteHeader overlay backLink="/blog" />
      <Seo
        title={post.title}
        description={textExcerpt}
        ogImage={
          imageUrlBuilder
            .image(post.mainImage)
            .width(1200)
            .height(627)
            .fit("crop")
            .url()!
        }
        ogType="article"
        canonical={post.canonicalUrl}
      />
      <Box as="main">
        <Image
          src={
            imageUrlBuilder.image(post.mainImage).width(1800).fit("crop").url()!
          }
          fallback={
            <Skeleton
              maxWidth="1800px"
              mx="auto"
              width="100%"
              height={[200, 300, 600]}
            />
          }
          alt={post.title}
          width="100%"
          maxWidth="1800px"
          mx="auto"
          height="auto"
          maxHeight="600px"
          objectFit="cover"
          objectPosition="center center"
          mb={[3, 6, 9]}
        />
        <Container maxWidth="80ch">
          <Heading as="h2" fontSize={["4xl", "3rem"]}>
            {post.title}
          </Heading>
          <Text color="gray.500" mb={2}>
            <HStack spacing={8}>
              <Box>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </Box>
              <Box>{textLength}</Box>
            </HStack>
          </Text>
          {post.canonicalUrl && (
            <Box p={3} backgroundColor={canonicalBackground}>
              Originally published at{" "}
              <TextLink href={post.canonicalUrl}>
                {new URL(post.canonicalUrl).hostname}
              </TextLink>
            </Box>
          )}
          <Box fontSize="2xl" my={[6, 12]}>
            <PortableText blocks={post.excerpt} />
          </Box>
        </Container>
        <BlogPostPortableText blocks={post.body} />
      </Box>
      <SiteFooter />
    </Box>
  );
}

export default BlogPage;
