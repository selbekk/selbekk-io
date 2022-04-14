import { Heading, Text } from "@chakra-ui/react";

export const BlockBlock = ({ node, children }: any) => {
  if (/^h\d/.test(node.style)) {
    const fontSizes = {
      h1: "4xl",
      h2: "3xl",
      h3: "2xl",
      h4: "xl",
      h5: "lg",
      h6: "md",
    };
    return (
      <Heading
        as={node.style}
        fontSize={fontSizes[node.style as keyof typeof fontSizes]}
        maxWidth="xl"
        mx="auto"
        mt={8}
      >
        {children}
      </Heading>
    );
  }
  return (
    <Text fontSize="1.1em" maxWidth="xl" mx="auto" mt={4}>
      {children}
    </Text>
  );
};
