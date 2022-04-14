import { Container, Heading, Stack, Text } from "@chakra-ui/react";
import type { MetaFunction } from "remix";
import { TextLink } from "~/features/design-system/TextLink";

export const meta: MetaFunction = () => ({
  title: "Projects – selbekk.io",
  description: "Here are some of Kristofer's projects outside of work",
});

const Projects = () => {
  return (
    <Container>
      <Stack>
        <Heading>Projects</Heading>
        <Text fontSize="xl">Here are some of my favorite projects.</Text>
        <Text>
          <TextLink href="https://sjau.no/en">Sjau</TextLink>,{" "}
          <TextLink href="https://opra.no">OPRA</TextLink> and{" "}
          <TextLink href="https://opengraph.ninja">OpenGraph Ninja</TextLink>
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
      </Stack>
    </Container>
  );
};

export default Projects;
