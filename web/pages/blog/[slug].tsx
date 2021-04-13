import { Text } from "@chakra-ui/layout";
import { Box, Container, Heading, Image } from "@chakra-ui/react";
import groq from "groq";
import { GetStaticPaths, GetStaticProps } from "next";
import { SanityProps } from "next-sanity-extra";
import React from "react";
import { BlogPostPortableText } from "../../features/portable-text/PortableText";
import {
  imageUrlBuilder,
  sanityClient,
  sanityStaticProps,
} from "../../lib/sanity";

type BlogPostDetail = {
  title: string;
  slug: { current: string };
  mainImage: any;
  body: any;
  publishedAt: any;
};
export const getStaticProps: GetStaticProps = async (context) => ({
  props: await sanityStaticProps({
    context,
    query: groq`*[_type == "post" && slug.current == $slug][0] {
    slug,
    title,
    publishedAt,
    mainImage,
    body
  }`,
    params: { slug: context.params!.slug },
  }),
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

function BlogPage(props: SanityProps<BlogPostDetail>) {
  const post = props.data;
  return (
    <Box>
      <Image
        src={
          imageUrlBuilder.image(post.mainImage).width(1800).fit("crop").url()!
        }
        alt={post.title}
        width="100%"
        maxWidth="1800px"
        mx="auto"
        height="auto"
        objectFit="cover"
        mb={[3, 6, 9]}
      />
      <Container>
        <Heading as="h2" fontSize={["2xl", "3rem"]}>
          {post.title}
        </Heading>
        <Text color="gray.500" mb={2}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}
        </Text>
      </Container>
      <BlogPostPortableText blocks={post.body} />
    </Box>
  );
}

export default BlogPage;
