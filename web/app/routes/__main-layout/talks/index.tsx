import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import groq from "groq";
import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { SearchableGrid } from "~/features/searchable-grid/SearchableGrid";
import { getClient } from "~/utils/sanity/client";

type TalkSummary = {
  title: string;
  slug: { current: string };
  when: string;
  where: string;
  description: any;
  excerpt: string;
  mainImage: any;
  categories: string[];
};
type LoaderData = {
  talks: TalkSummary[];
};
export const loader: LoaderFunction = async () => {
  const talks = await getClient().fetch(
    groq`*[_type == "talk"] | order(when desc) {
      _type,
      title,
      slug,
      "publishedAt": when,
      where,
      description,
      "excerpt": pt::text(excerpt),
      mainImage,
      "categories": categories[]->title
    }`
  );
  return { talks };
};

export const meta = () => ({
  title: "Talks by Kristofer",
  description:
    "Search through all of the talks Kristofer Giltvedt Selbekk has held",
});

export default function TalksListPage() {
  const { talks } = useLoaderData<LoaderData>();
  return (
    <Box>
      <Container maxWidth="80ch">
        <Stack spacing={3}>
          <Heading as="h1">Talks</Heading>
          <Text fontSize="xl">
            Here, you'll find all talks I've done (or at least those that were
            recorded). You can search for specific talks below, or just browse.
          </Text>
        </Stack>
      </Container>
      <SearchableGrid items={talks} />
    </Box>
  );
}
