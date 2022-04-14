import { Box, Flex } from "@chakra-ui/react";
import opengraphNinjaStylesHref from "@opengraphninja/react/styles.css";
import type { LinksFunction } from "remix";
import { Outlet } from "remix";
import { SiteFooter } from "../features/site-footer/SiteFooter";
import { SiteHeader } from "../features/site-header/SiteHeader";

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: opengraphNinjaStylesHref,
  },
];

export default function MainLayout() {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <SiteHeader />
      <Box flex="1">
        <Outlet />
      </Box>
      <SiteFooter />
    </Flex>
  );
}
