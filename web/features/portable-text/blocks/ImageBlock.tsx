import { Image } from "@chakra-ui/image";
import { Text } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import * as React from "react";
import { imageUrlBuilder } from "../../../lib/sanity";

export const ImageBlock = ({ node }: any) => {
  if (!node?.asset) {
    return null;
  }

  return (
    <Stack as="figure">
      <Image
        src={imageUrlBuilder.image(node.asset).width(800).url()!}
        alt={node.alt}
      />
      {node.caption && (
        <Text as="figcaption" color="gray.500" textAlign="center">
          {node.caption}
        </Text>
      )}
    </Stack>
  );
};
