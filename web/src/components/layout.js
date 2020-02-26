import React from 'react';
import Header from './header';

import '../styles/layout.css';
import styles from './layout.module.css';

const Layout = ({ children, onHideNav, onShowNav, showNav, siteTitle }) => (
  <>
    <Header
      siteTitle={siteTitle}
      onHideNav={onHideNav}
      onShowNav={onShowNav}
      showNav={showNav}
    />
    <main className={styles.content}>{children}</main>
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        <div className={styles.siteInfo}>
          Kristofer Giltvedt Selbekk &copy; {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </div>
    </footer>
  </>
);

export default Layout;
