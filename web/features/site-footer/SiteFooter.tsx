import { Box, BoxProps, Text } from "@chakra-ui/react";
import * as React from "react";
import { LightSwitch } from "../light-switch/LightSwitch";

export const SiteFooter = (props: BoxProps) => {
  return (
    <Box {...props}>
      <Box p={6} maxWidth="xl" mx="auto" textAlign="center">
        <Text>
          All rights reserved &copy; {new Date().getFullYear()} <LightSwitch />
        </Text>
      </Box>
    </Box>
  );
};
