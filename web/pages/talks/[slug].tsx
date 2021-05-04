import { Text } from "@chakra-ui/layout";
import { Box, Container, Heading } from "@chakra-ui/react";
import groq from "groq";
import { GetStaticPaths, GetStaticProps } from "next";
import { SanityProps } from "next-sanity-extra";
import React from "react";
import { PortableText } from "../../features/portable-text/PortableText";
import { Seo } from "../../features/seo/Seo";
import { SiteFooter } from "../../features/site-footer/SiteFooter";
import { SiteHeader } from "../../features/site-header/SiteHeader";
import { VideoViewer } from "../../features/video-viewer/VideoViewer";
import {
  blocksToText,
  imageUrlBuilder,
  sanityClient,
  sanityStaticProps,
} from "../../lib/sanity";

type TalkDetail = {
  title: string;
  slug: { current: string };
  mainImage: any;
  excerpt: any;
  description: any;
  when: string;
  where: string;
  videoUrl: string;
};
export const getStaticProps: GetStaticProps = async (context) => ({
  props: await sanityStaticProps({
    context,
    query: groq`*[_type == "talk" && slug.current == $slug][0] {
    slug,
    title,
    excerpt,
    description,
    when,
    where,
    mainImage,
    videoUrl
  }`,
    params: { slug: context.params!.slug },
  }),
});

export const getStaticPaths: GetStaticPaths = async () => {
  const results = await sanityClient("anonymous")
    .fetch(groq`*[_type == "talk"] {
    slug
  }`);
  const paths = results.map((result: any) => `/talks/${result.slug.current}`);
  return {
    paths,
    fallback: "blocking",
  };
};

function TalkPage({ data: talk }: SanityProps<TalkDetail>) {
  const textExcerpt = React.useMemo(() => blocksToText(talk.excerpt), [
    talk.excerpt,
  ]);
  return (
    <Box>
      <SiteHeader overlay backLink="/talks" />
      <Seo
        title={talk.title}
        description={textExcerpt}
        ogImage={
          imageUrlBuilder
            .image(talk.mainImage)
            .width(1200)
            .height(627)
            .fit("crop")
            .url()!
        }
        ogType="article"
      />
      <Box as="main">
        <Box mb={6}>
          <VideoViewer src={talk.videoUrl} />
        </Box>
        <Container maxWidth="80ch">
          <Heading as="h2" fontSize={["2xl", "3rem"]}>
            {talk.title}
          </Heading>
          <Text color="gray.500" mb={2}>
            <Box>
              {new Date(talk.when).toLocaleDateString("en-US", {
                dateStyle: "long",
              })}
            </Box>
          </Text>
          <Box fontSize="xl" my={6}>
            <PortableText blocks={talk.description} />
          </Box>
        </Container>
      </Box>
      <SiteFooter />
    </Box>
  );
}

export default TalkPage;
