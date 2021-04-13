import { Box, Container, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { TextLink } from "../../features/design-system/TextLink";
import { Seo } from "../../features/seo/Seo";
import { SiteFooter } from "../../features/site-footer/SiteFooter";
import { SiteHeader } from "../../features/site-header/SiteHeader";

const Projects = () => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Seo
        title="Projects"
        description="Here are some of Kristofer's projects outside of work"
      />
      <SiteHeader />
      <Box as="main" flex="1">
        <Container>
          <Stack>
            <Heading>Projects</Heading>
            <Text fontSize="xl">Here are some of my favorite projects.</Text>
            <Text>
              <TextLink href="https://sjau.no/en">Sjau</TextLink>,{" "}
              <TextLink href="https://opra.no">OPRA</TextLink> and{" "}
              <TextLink href="https://opengraph.ninja">
                OpenGraph Ninja
              </TextLink>
            </Text>
            <Text>
              I've also created a few open source libraries -{" "}
              <TextLink href="https://github.com/selbekk/calidation">
                Calidation
              </TextLink>
              ,{" "}
              <TextLink href="https://github.com/selbekk/timeproxy">
                Timeproxy
              </TextLink>
              , and a{" "}
              <TextLink href="https://github.com/selbekk/repositories">
                bunch of others
              </TextLink>
            </Text>
            <Text>
              I promise to make this a bit more good lookin' in the future.
            </Text>
          </Stack>
        </Container>
      </Box>
      <SiteFooter />
    </Flex>
  );
};

export default Projects;
