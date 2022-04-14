import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import { useMemo, useState } from "react";
import { Link } from "remix";
import { imageUrlBuilder } from "~/utils/sanity/image";
import { SearchPanel } from "./SearchPanel";

type SearchableListProps = {
  items: Record<string, any>[];
};

export const SearchableGrid = ({ items }: SearchableListProps) => {
  const [searchString, setSearchString] = useState("");
  const filteredItems = useMemo(
    () =>
      searchString
        ? matchSorter(items, searchString, {
            keys: ["title", "categories"],
          })
        : items,
    [searchString, items]
  );
  return (
    <>
      <Container maxWidth="80ch" mt={6}>
        <Box mb={6}>
          <SearchPanel
            onChange={({ searchString }) => setSearchString(searchString)}
          />
        </Box>
        {filteredItems.length === 0 && (
          <Text textAlign="center" fontWeight="bold">
            There's no matches for your search 👎
          </Text>
        )}
      </Container>
      <SimpleGrid
        columns={[1, 1, 2, 3]}
        columnGap={3}
        rowGap={[12]}
        as="main"
        maxWidth="1200px"
        mx="auto"
      >
        {filteredItems.map((item) => (
          <Box
            as={Link}
            to={`/${item._type === "talk" ? "talks" : "blog"}/${
              item.slug.current
            }`}
            key={item.slug.current}
          >
            <Image
              src={
                imageUrlBuilder
                  .image(item.mainImage)
                  .width(600)
                  .height(400)
                  .fit("crop")
                  .format("webp")
                  .url()!
              }
              fallback={<Skeleton width="100%" height="200px" />}
              alt={item.title}
              width="100%"
              height="auto"
              objectFit="cover"
              overflow="hidden"
              borderRadius="md"
            />
            <Box p={3}>
              <Heading as="h3" fontSize="2xl">
                {item.title}
              </Heading>
              <Text color="gray.700" mb={2}>
                {new Date(item.publishedAt).toLocaleDateString("en-US", {
                  dateStyle: "long",
                })}
              </Text>
              <Text>{item.excerpt}</Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};
