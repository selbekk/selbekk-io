import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { PageTitle, Paragraph } from '../components/typography';
import Container from '../components/container';

export const query = graphql`
  query TalksPageQuery {
    talks: allSanityTalk {
      edges {
        node {
          id
          when
          where
          title
          videoUrl
          slug {
            current
          }
        }
      }
    }
  }
`;

export default function TalksPage(props) {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  console.log('data', data);

  return (
    <Layout>
      <SEO
        title="Talks"
        description="Here you will find all recorded talks by Kristofer Giltvedt Selbekk"
      />
      <Container>
        <PageTitle>Talks</PageTitle>
        <Paragraph>
          Here is a list of recorded talks that I've given. Some are in
          Norwegian, while some will be in English. I hope you learn a thing or
          two 💪
        </Paragraph>
      </Container>
    </Layout>
  );
}
