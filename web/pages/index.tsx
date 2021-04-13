import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { TextLink } from "../features/design-system/TextLink";
import { Seo } from "../features/seo/Seo";
import { SiteFooter } from "../features/site-footer/SiteFooter";

export default function Home() {
  return (
    <Box>
      <Seo />
      <Flex flexDirection={["column", "column", "row"]} as="main">
        <Box flex="0 0 50%" height={["50vh", "100vh"]}>
          <Image
            src="/selfie.jpg"
            objectFit="cover"
            objectPosition="center center"
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
                Go browse some of my <TextLink href="/blog">articles</TextLink>{" "}
                or discover my <TextLink href="/projects">projects</TextLink>.
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
