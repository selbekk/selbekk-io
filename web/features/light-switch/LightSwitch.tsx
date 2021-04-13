import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/react";
import * as React from "react";

export const LightSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      size="sm"
      variant="outline"
      colorScheme="gray"
      onClick={toggleColorMode}
    >
      {colorMode === "light" ? "🌘" : "🌖"} Turn{" "}
      {colorMode === "light" ? "off" : "on"} the lights
    </Button>
  );
};
