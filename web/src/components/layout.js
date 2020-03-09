import React from 'react';
import Header from './header';

import '../styles/layout.css';
import styles from './layout.module.css';

const Layout = ({ children, siteTitle }) => (
  <>
    <Header siteTitle={siteTitle} />
    <main className={styles.content}>{children}</main>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <p>
          Thanks for making it all the way down here! 🤗 If you want to get in
          touch with me, hit me up on{' '}
          <a href="https://twitter.com/selbekk">Twitter</a> or{' '}
          <a href="mailto:kristofer@selbekk.io">kristofer@selbekk.io</a>.
        </p>
        <small className={styles.siteInfo}>
          Kristofer Giltvedt Selbekk &copy; {new Date().getFullYear()}. All
          rights reserved.
        </small>
      </div>
    </footer>
  </>
);

export default Layout;
