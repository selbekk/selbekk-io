import { Container, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { Box, Flex, Heading, Image, Skeleton } from "@chakra-ui/react";
import groq from "groq";
import { matchSorter } from "match-sorter";
import { GetStaticProps } from "next";
import { SanityProps } from "next-sanity-extra";
import Link from "next/link";
import React from "react";
import { PortableText } from "../../features/portable-text/PortableText";
import { SearchPanel } from "../../features/search-panel/SearchPanel";
import { Seo } from "../../features/seo/Seo";
import { SiteFooter } from "../../features/site-footer/SiteFooter";
import { SiteHeader } from "../../features/site-header/SiteHeader";
import { imageUrlBuilder, sanityStaticProps } from "../../lib/sanity";

type TalkSummary = {
  title: string;
  slug: { current: string };
  when: string;
  where: string;
  description: any;
  excerpt: any;
  mainImage: any;
  categories: string[];
};
export const getStaticProps: GetStaticProps = async (context) => ({
  props: await sanityStaticProps({
    context,
    query: groq`*[_type == "talk"] | order(publishedAt desc) {
    title,
    slug,
    when,
    where,
    description,
    excerpt,
    mainImage,
    "categories": categories[]->title
  }`,
  }),
});

function TalkListPage({ data: allTalks }: SanityProps<TalkSummary[]>) {
  const [searchString, setSearchString] = React.useState("");
  const filteredTalks = React.useMemo(
    () =>
      searchString
        ? matchSorter(allTalks, searchString, {
            keys: ["title", "categories"],
          })
        : allTalks,
    [searchString, allTalks]
  );
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <SiteHeader />
      <Seo
        title="Talks by Kristofer"
        description="Search through all of the talks Kristofer Giltvedt Selbekk has held"
      />
      <Box flex="1">
        <Container mb={6} maxWidth="80ch">
          <Stack spacing={3}>
            <Heading as="h1">Talks</Heading>
            <Text fontSize="xl">
              Here, you'll find all talks I've done (or at least those that were
              recorded). You can search for specific talks below, or just
              browse.
            </Text>
            <Box>
              <SearchPanel
                onChange={({ searchString }) => setSearchString(searchString)}
              />
            </Box>
          </Stack>
        </Container>
        {filteredTalks.length === 0 && (
          <Text textAlign="center" fontWeight="bold">
            No talks matched your search 👎
          </Text>
        )}
        <SimpleGrid
          columns={[1, 1, 2, 3]}
          columnGap={3}
          rowGap={[12]}
          as="main"
          maxWidth="1200px"
          mx="auto"
        >
          {filteredTalks.map((talk) => (
            <Link
              key={talk.slug.current}
              href={`/talks/${talk.slug.current}`}
              passHref
            >
              <Box as="a">
                <Image
                  src={
                    imageUrlBuilder
                      .image(talk.mainImage)
                      .width(640)
                      .height(360)
                      .fit("clip")
                      .url()!
                  }
                  fallback={<Skeleton width="100%" height="220px" />}
                  alt={talk.title}
                  width="100%"
                  height="auto"
                  objectFit="contain"
                />
                <Box p={3}>
                  <Heading as="h3" fontSize="2xl">
                    {talk.title}
                  </Heading>
                  <Text color="gray.500" mb={2}>
                    {new Date(talk.when).toLocaleDateString("en-US", {
                      dateStyle: "long",
                    })}
                  </Text>
                  <PortableText blocks={talk.excerpt} />
                </Box>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
      <SiteFooter />
    </Flex>
  );
}

export default TalkListPage;
