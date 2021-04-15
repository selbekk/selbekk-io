import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Button } from "@chakra-ui/react";
import * as React from "react";

export const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      size="sm"
      variant="outline"
      colorScheme="gray"
      leftIcon={<Box>{colorMode === "light" ? "🌘" : "🌖"}</Box>}
      onClick={toggleColorMode}
    >
      Turn {colorMode === "light" ? "off" : "on"} the lights
    </Button>
  );
};
