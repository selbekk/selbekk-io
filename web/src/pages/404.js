import React from 'react';

import { PageTitle, Paragraph } from '../components/typography';
import Container from '../components/container';
import Layout from '../components/layout';
import SEO from '../components/seo';
import YoutubeEmbed from 'react-youtube';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Here's some 808s" />
    <Container align="center">
      <PageTitle>Sorry, that URL is no more.</PageTitle>
      <Paragraph>
        Don't feel bad though. We all make mistakes. Here's a rap video I made
        about a decade ago.
      </Paragraph>
      <YoutubeEmbed videoId="Df_548qmfOE" />
    </Container>
  </Layout>
);

export default NotFoundPage;
