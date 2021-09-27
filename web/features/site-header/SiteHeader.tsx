import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

type SiteHeaderProps = {
  /** Shows a back arrow, linking to the specified URL */
  backLink?: string;
  overlay?: boolean;
  children?: React.ReactNode;
};
export const SiteHeader = ({
  backLink,
  overlay = false,
  children,
}: SiteHeaderProps) => {
  const background = useColorModeValue("white", "gray.800");
  return (
    <Flex
      as="header"
      p={3}
      justifyContent="space-between"
      position={overlay ? ["static", "fixed"] : "static"}
      left="0"
      right="0"
      top="0"
    >
      <Heading as="h1" background={background} overflow="hidden">
        <Link href={backLink || "/"} passHref>
          <Box
            as="a"
            p={3}
            display="block"
            _hover={backLink ? { transform: "translateX(-10px)" } : undefined}
            transition=".1s ease-out"
          >
            {backLink && (
              <Box as="span" mr={3} aria-label="Go back">
                &larr;
              </Box>
            )}
            selbekk
          </Box>
        </Link>
      </Heading>
      {children}
    </Flex>
  );
};
