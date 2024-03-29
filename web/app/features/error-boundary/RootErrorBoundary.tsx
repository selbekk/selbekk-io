import { Box, Center, Heading, Text } from "@chakra-ui/react";
export type RootErrorBoundaryProps = {
  error: Error;
};
export const RootErrorBoundary = ({ error }: RootErrorBoundaryProps) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
    return (
      <Center minHeight="100vh">
        <Box>
          <Heading as="h1">There was an error</Heading>
          <Text>{error.message}</Text>
        </Box>
      </Center>
    );
  }
  return (
    <Box>
      <Heading as="h1">Oops, an error occurred!</Heading>
      <Text>
        Sorry about that. We've told somebody, and will hopefully fix this
        shortly.
      </Text>
    </Box>
  );
};
