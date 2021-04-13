import { Box, BoxProps, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { LightSwitch } from "../light-switch/LightSwitch";

export const SiteFooter = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Stack p={6} textAlign="center" direction={["column", "row"]}>
        <Box flex="1">
          <LightSwitch />
        </Box>
        <Box flex="1">
          <Text>
            All rights reserved &copy; {new Date().getFullYear()}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};
