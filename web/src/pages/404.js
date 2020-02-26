import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Oops, that page ain't around no mo'</h1>
    <p>Go back to the front page and try again!</p>
  </Layout>
);

export default NotFoundPage;
