import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import matchSorter from 'match-sorter';
import BlogPostPreview from './blog-post-preview';
import { toPlainText } from '../lib/helpers';
import styles from './blog-post-preview-grid.module.css';

const SearchContainer = styled.div`
  margin-bottom: 1em;
`;
const SearchLabel = styled.label`
  display: block;
`;
const SearchInput = styled.input`
  appearance: none;
  background: transparent;
  color: inherit;
  border: none;
  border-bottom: 0.5rem solid var(--color-text-body);
  border-radius: none;
  padding: 0.5rem 0;
  width: 100%;
  max-width: 600px;
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: var(--color-accent);
  }

  @media (min-width: 675px) {
    font-size: 2rem;
  }
`;
const ArticleCount = styled.div``;

function BlogPostPreviewGrid(props) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const posts = React.useMemo(() => {
    if (!props.nodes) {
      return [];
    }
    return matchSorter(props.nodes, searchTerm, {
      keys: [
        'title',
        'category',
        {
          threshold: matchSorter.rankings.WORD_STARTS_WITH,
          key: (post) => toPlainText(post._rawExcerpt),
        },
      ],
    });
  });
  return (
    <div className={styles.root}>
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <SearchContainer>
        <SearchLabel htmlFor="article-search-field">
          Find the article you're looking for
        </SearchLabel>
        <SearchInput
          type="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Title, category or excerpt"
          value={searchTerm}
          id="article-search-field"
          aria-describedby="article-count"
        />
        <ArticleCount id="article-count">
          {posts.length} article{posts.length !== 1 && 's'}
        </ArticleCount>
      </SearchContainer>
      <ul className={styles.grid}>
        {posts.map((node) => (
          <li key={node.id}>
            <BlogPostPreview {...node} />
          </li>
        ))}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
  );
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default BlogPostPreviewGrid;
