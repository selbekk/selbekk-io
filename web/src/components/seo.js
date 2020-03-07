import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { imageUrlFor } from '../lib/image-url';
import { buildImageObj } from '../lib/helpers';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      author {
        name
      }
    }
  }
`;

function SEO({
  canonicalUrl,
  description,
  lang,
  meta,
  keywords,
  title,
  image,
}) {
  const { site } = useStaticQuery(detailsQuery);

  const metaDescription = description || (site && site.description) || '';
  const siteTitle = (site && site.title) || '';
  const siteAuthor = (site && site.author && site.author.name) || '';
  const metaImage =
    image && image.asset
      ? imageUrlFor(buildImageObj(image))
          .width(1200)
          .url()
      : '';

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: metaImage,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: siteAuthor,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        keywords && keywords.length > 0
          ? {
              name: 'keywords',
              content: keywords.join(', '),
            }
          : false,
        ...meta,
      ].filter(Boolean)}
    >
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
