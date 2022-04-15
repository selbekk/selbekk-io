import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import type { HeadersFunction } from "remix";
import { TextLink } from "~/features/design-system/TextLink";
import { SiteFooter } from "~/features/site-footer/SiteFooter";

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "s-maxage=86400, stale-while-revalidate=604800",
  };
};

export default function Home() {
  const imageUrl = useColorModeValue("/selfie.webp", "/selfie-dark.webp");
  return (
    <Box>
      <Flex flexDirection={["column", "column", "row"]} as="main">
        <Box flex="0 0 50%" height={["50vh", "100vh"]}>
          <Image
            src={imageUrl}
            objectFit="cover"
            objectPosition="center center"
            fallback={<Skeleton width="100%" height="100%" maxHeight="100vh" />}
            width="100%"
            height="100%"
            alt="Kristofer Giltvedt Selbekk"
            maxHeight="100vh"
          />
        </Box>
        <Flex justifyContent="center" alignItems="center" flex="0 0 50%">
          <Container>
            <Stack>
              <Heading as="h1" fontSize="3rem" fontWeight="bold">
                Hi there!
              </Heading>
              <Text fontSize="xl">
                I'm <strong>Kristofer Giltvedt Selbekk</strong>, and I'm a
                husband, dad, developer, writer and speaker.
              </Text>
              <Text fontSize="xl">
                Go browse some of my{" "}
                <TextLink prefetch="intent" href="/blog">
                  articles
                </TextLink>
                , watch my{" "}
                <TextLink prefetch="intent" href="/talks">
                  talks
                </TextLink>{" "}
                or discover my{" "}
                <TextLink prefetch="intent" href="/projects">
                  projects
                </TextLink>
                .
              </Text>
              <Text fontSize="xl">
                Here's my{" "}
                <TextLink href="https://twitter.com/selbekk">Twitter</TextLink>{" "}
                and here's my{" "}
                <TextLink href="https://www.linkedin.com/in/selbekk/">
                  LinkedIn
                </TextLink>
                .
              </Text>
              <Text fontSize="xl">Have a great day 👋</Text>
            </Stack>
          </Container>
        </Flex>
      </Flex>
      <SiteFooter />
    </Box>
  );
}
