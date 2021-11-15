import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import * as React from "react";

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "article" | "website" | "video.other";
  canonical?: string;
};
export const Seo = ({
  title = "Articles and talks by Kristofer Giltvedt Selbekk",
  description = "Read articles, watch talks, and learn more than you need to know about Kristofer Giltvedt Selbekk",
  keywords = "articles, talks, react, javascript, typescript, kristofer giltvedt selbekk",
  ogImage = "https://selbekk.io/og-image.jpg",
  ogType = "website",
  canonical,
}: SeoProps) => {
  const { pathname } = useRouter();
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {canonical && <link rel="canonical" href={canonical} />}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={`https://selbekk.io${pathname}`} />
      <meta property="og:site_name" content="selbekk.io" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
