import { Image, Stack, Text } from "@chakra-ui/react";
import { imageUrlBuilder } from "~/utils/sanity/image";

export const ImageBlock = (props: any) => {
  if (!props.value.asset) {
    return null;
  }

  return (
    <Stack as="figure">
      <Image
        src={imageUrlBuilder.image(props.value.asset).width(800).url()!}
        alt={props.value.alt}
      />
      {props.value.caption && (
        <Text as="figcaption" color="gray.500" textAlign="center">
          {props.value.caption}
        </Text>
      )}
    </Stack>
  );
};
