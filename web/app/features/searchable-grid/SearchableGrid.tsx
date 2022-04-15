import {
  Box,
  Container,
  Heading,
  Image,
  SimpleGrid,
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
            prefetch="intent"
            to={`/${item._type === "talk" ? "talks" : "blog"}/${
              item.slug.current
            }`}
            key={item.slug.current}
          >
            <Image
              {...getImageProps(item.mainImage)}
              fallbackSrc={imageUrlBuilder
                .image(item.mainImage)
                .width(20)
                .height(15)
                .fit("crop")
                .blur(50)
                .format("webp")
                .url()}
              __css={{ aspectRatio: "4/3" }}
              alt={item.title}
              width="100%"
              height="auto"
              objectFit="cover"
              overflow="hidden"
              borderRadius={["none", "md"]}
            />
            <Box p={3}>
              <Heading as="h2" fontSize="2xl">
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
const getUrlForSize = (size: number, sanityImage: any) =>
  imageUrlBuilder
    .image(sanityImage)
    .width(size)
    .height(size / 1.5)
    .fit("crop")
    .format("webp")
    .url();

const getImageProps = (sanityImage: any) => {
  const imageSizes = [762, 490, 392];

  const srcSet = imageSizes
    .map((size) => {
      const url = getUrlForSize(size, sanityImage);
      return `${url} ${size}w`;
    })
    .join(",\n");

  const sizes = [
    "(max-width: 767px) 100vw",
    "(min-width: 768px and max-width: 992px) 48vw",
    "392px",
  ].join(", ");
  return { src: getUrlForSize(imageSizes[0], sanityImage), srcSet, sizes };
};
