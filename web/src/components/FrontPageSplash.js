import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const Container = styled.section``;

const Hero = styled.p`
  font-size: 24px;
  margin: 1em;
`;

const StyledImage = styled(Img)`
  flex: 1 0 100%;

  @media (min-width: 675px) {
    flex: 1 0 25%;
  }
`;

const Content = styled.div`
  max-width: 960px;
  padding: 0;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 675px) {
    // TODO: generalize this
    flex-direction: row;
  }
`;

export const FrontPageSplash = ({ imgSrc }) => {
  return (
    <Container>
      <Content>
        <StyledImage fixed={imgSrc} />
        <Hero>
          <strong>Hi I'm Kristofer.</strong> I'm a full stack engineer that just
          happens to specialize in React, CSS and accessibility.
        </Hero>
      </Content>
    </Container>
  );
};
