import { Box, Center, ChakraProvider, Heading, Text } from "@chakra-ui/react";
import { withEmotionCache } from "@emotion/react";
import type { ReactNode } from "react";
import { useContext, useEffect } from "react";
import type { LinksFunction, LoaderFunction, MetaFunction } from "remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "remix";
import { AnalyticsScript } from "./features/analytics/analytics";
import {
  ClientStyleContext,
  ServerStyleContext,
} from "./features/chakra-setup/styleContext";
import { RootErrorBoundary } from "./features/error-boundary/RootErrorBoundary";
import type { SiteSettings } from "./utils/siteSettings.server";
import { getSiteSettings } from "./utils/siteSettings.server";

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  const { title, description, keywords } = data.siteSettings;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1",
    "og:image": "https://selbekk.io/og-image.jpg",
    "og:type": "website",
    "og:title": title,
    "og:description": description,
    "og:site_name": "selbekk.io",
    "twitter:card": "summary",
    "twitter:author": "@selbekk",
    "twitter:site": "@selbekk",
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    {
      rel: "icon",
      href: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      href: "/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ];
};

export type LoaderData = {
  siteSettings: SiteSettings;
};
export const loader: LoaderFunction = async () => {
  return {
    siteSettings: await getSiteSettings(),
  };
};

/**
 * The error boundary shown if no other error boundary catches the error.
 */
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Error!">
      <RootErrorBoundary error={error} />
    </Document>
  );
}

/**
 * Catches HTTP errors
 */
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 404:
      message = (
        <Text>
          It looks like you tried to access a page that doesn't exist 🤷‍♂️
        </Text>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} - ${caught.statusText}`}>
      <Center minHeight="100vh">
        <Box textAlign="center">
          <Heading as="h1">
            {caught.status}: {caught.statusText}
          </Heading>
          {message}
        </Box>
      </Center>
    </Document>
  );
}

type DocumentProps = {
  children: ReactNode;
  title?: string;
};

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en-us">
        <head>
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
          <AnalyticsScript />
        </head>
        <body>
          <ChakraProvider>{children}</ChakraProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
