import React from 'react';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import PortableText from './portableText';
import Container from './container';

import styles from './blog-post.module.css';
import { Metadata } from './metadata';

function BlogPost(props) {
  const {
    _rawBody,
    authors,
    canonicalUrl,
    categories,
    title,
    mainImage,
    publishedAt,
  } = props;

  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .auto('format')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>{title}</h1>
          <Metadata
            publishedAt={publishedAt}
            authors={authors}
            categories={categories}
            canonicalUrl={canonicalUrl}
          />
          <div className={styles.grid}>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>
        </div>
      </Container>
    </article>
  );
}

export default BlogPost;
