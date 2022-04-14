import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import groq from "groq";
import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import { SearchableGrid } from "~/features/searchable-grid/SearchableGrid";
import { getClient } from "~/utils/sanity/client";

type BlogPostSummary = {
  title: string;
  slug: { current: string };
  mainImage: any;
  excerpt: string;
  categories: string[];
  publishedAt: string;
};
type LoaderData = {
  posts: BlogPostSummary[];
};
export const loader: LoaderFunction = async () => {
  const posts = await getClient().fetch(
    groq`*[_type == "post" && publishedAt <= $now] | order(publishedAt desc) {
      _type,
      slug,
      title,
      publishedAt,
      mainImage,
      "excerpt": pt::text(excerpt),
      "categories": categories[]->title
    }`,
    { now: new Date().toISOString() }
  );
  return { posts };
};

export const meta = () => ({
  title: "Articles by Kristofer",
  description:
    "Search through most of the articles Kristofer Giltvedt Selbekk has created the last couple of years",
});

function BlogListPage() {
  const { posts } = useLoaderData<LoaderData>();
  return (
    <Box>
      <Container maxWidth="80ch">
        <Stack spacing={3}>
          <Heading as="h1">Articles</Heading>
          <Text fontSize="xl">
            Here, you'll find most of the articles I've written the last couple
            of years. You can search for specific articles below, or just
            browse.
          </Text>
        </Stack>
      </Container>
      <SearchableGrid items={posts} />
    </Box>
  );
}

export default BlogListPage;
