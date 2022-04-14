import { Box, Button, useColorMode } from "@chakra-ui/react";

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
