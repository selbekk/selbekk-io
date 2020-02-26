import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../components/layout';

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`;

function LayoutContainer(props) {
  const [showNav, setShowNav] = useState(false);
  const { site } = useStaticQuery(query);

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"',
    );
  }

  return (
    <Layout
      {...props}
      showNav={showNav}
      siteTitle={site.title}
      onHideNav={() => setShowNav(false)}
      onShowNav={() => setShowNav(true)}
    />
  );
}

export default LayoutContainer;
