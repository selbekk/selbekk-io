import React from 'react';
import { format, distanceInWords, differenceInDays } from 'date-fns';
import AuthorList from './author-list';
import styles from './metadata.module.css';

export const Metadata = ({
  publishedAt,
  authors,
  categories,
  canonicalUrl,
  readingTime,
}) => {
  const parsedCanonicalUrl = canonicalUrl ? new URL(canonicalUrl).hostname : '';
  let canonicalDomain = parsedCanonicalUrl;
  if (parsedCanonicalUrl.startsWith('www.')) {
    canonicalDomain = parsedCanonicalUrl.substring(4);
  }
  return (
    <div>
      {publishedAt && (
        <div className={styles.publishedAt}>
          {differenceInDays(new Date(publishedAt), new Date()) > 3
            ? distanceInWords(new Date(publishedAt), new Date())
            : format(new Date(publishedAt), 'MMMM Do, YYYY')}
          {' – '}An estimated {readingTime.text} – Categorized as{' '}
          {categories.map((category) => category.title).join(', ')}
        </div>
      )}
      {authors && <AuthorList items={authors} />}
      {canonicalUrl && (
        <div className={styles.postedElsewhere}>
          <div className={styles.postedElsewhereHeadline}>
            Originally posted at{' '}
            <a className={styles.postedElsewhereLink} href={canonicalUrl}>
              {canonicalDomain}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
