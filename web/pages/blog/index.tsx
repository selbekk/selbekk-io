import { SimpleGrid, Text } from "@chakra-ui/layout";
import { Box, Heading, Image } from "@chakra-ui/react";
import groq from "groq";
import { GetStaticProps } from "next";
import { SanityProps } from "next-sanity-extra";
import Link from "next/link";
import React from "react";
import { PortableText } from "../../features/portable-text/PortableText";
import { imageUrlBuilder, sanityStaticProps } from "../../lib/sanity";

type BlogPostSummary = {
  title: string;
  slug: { current: string };
  mainImage: any;
  excerpt: any;
  publishedAt: any;
};
export const getStaticProps: GetStaticProps = async (context) => ({
  props: await sanityStaticProps({
    context,
    query: groq`*[_type == "post"] | order(publishedAt desc) {
    slug,
    title,
    publishedAt,
    mainImage,
    excerpt
  }`,
  }),
});

function BlogPage(props: SanityProps<BlogPostSummary[]>) {
  return (
    <Box maxWidth="1200px" px={[6, 3, 0]} mx="auto">
      <SimpleGrid columns={[1, 1, 2, 3]} columnGap={3} rowGap={[12]}>
        {props.data.map((post) => (
          <Link
            href={`/blog/${post.slug.current}`}
            passHref
            key={post.slug.current}
          >
            <Box as="a">
              <Image
                src={
                  imageUrlBuilder
                    .image(post.mainImage)
                    .width(600)
                    .height(400)
                    .fit("crop")
                    .url()!
                }
                alt={post.title}
                width="100%"
                height="auto"
                objectFit="cover"
              />
              <Box p={3}>
                <Heading as="h3" fontSize="2xl">
                  {post.title}
                </Heading>
                <Text color="gray.500" mb={2}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    dateStyle: "long",
                  })}
                </Text>
                <PortableText blocks={post.excerpt} />
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default BlogPage;
