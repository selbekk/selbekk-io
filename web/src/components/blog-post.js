import React from 'react';
import readingTime from 'reading-time';
import { buildImageObj, toPlainText } from '../lib/helpers';
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

  const estimatedReadingTime = React.useMemo(
    () => readingTime(toPlainText(_rawBody)),
    [_rawBody],
  );

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
            readingTime={estimatedReadingTime}
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
