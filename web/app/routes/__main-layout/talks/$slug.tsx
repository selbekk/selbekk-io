import { Box, Container, Heading, Text } from "@chakra-ui/react";
import groq from "groq";
import type { LoaderFunction, MetaFunction } from "remix";
import { useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { PortableText } from "~/features/portable-text/PortableText";
import { VideoViewer } from "~/features/video-viewer/VideoViewer";
import { getClient } from "~/utils/sanity/client";
import { imageUrlBuilder } from "~/utils/sanity/image";

type TalkDetail = {
  title: string;
  slug: { current: string };
  mainImage: any;
  excerpt: string;
  description: any;
  when: string;
  where: string;
  videoUrl: string;
};
type LoaderData = {
  talk: TalkDetail;
};
export const loader: LoaderFunction = async ({ params }) => {
  invariant(
    params.slug,
    "slug is a required part of the URL. Make sure the route is named with $slug"
  );
  const talk = await getClient().fetch(
    groq`*[_type == "talk" && slug.current == $slug][0] {
    slug,
    title,
    "excerpt": pt::text(excerpt),
    description,
    when,
    where,
    mainImage,
    videoUrl
  }`,
    { slug: params.slug }
  );
  return {
    talk,
  };
};

export const meta: MetaFunction = ({ data }) => {
  if (!data?.talk) {
    return {};
  }
  const { talk } = data;
  return {
    title: `${talk.title} - selbekk.io`,
    description: talk.excerpt,
    "og:image": imageUrlBuilder
      .image(talk.mainImage)
      .width(1200)
      .height(627)
      .fit("crop")
      .url(),
    "og:type": "video",
    "og:video:url": talk.videoUrl,
  };
};

function TalkPage() {
  const { talk } = useLoaderData<LoaderData>();
  return (
    <Box>
      <Box mb={6}>
        <VideoViewer src={talk.videoUrl} />
      </Box>
      <Container maxWidth="2xl">
        <Heading as="h2" fontSize={["2xl", "3rem"]}>
          {talk.title}
        </Heading>
        <Text color="gray.500" mb={2}>
          {new Date(talk.when).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}
        </Text>
        <Box fontSize="xl" my={6}>
          <PortableText blocks={talk.description} />
        </Box>
      </Container>
    </Box>
  );
}

export default TalkPage;
