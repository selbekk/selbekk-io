import React from 'react';
import classNames from 'classnames';
import styles from './typography.module.css';

export const PageTitle = ({ className, ...rest }) => (
  <h1 className={classNames(styles.responsiveTitle1, className)} {...rest} />
);

export const SectionTitle = ({ className, ...rest }) => (
  <h2 className={classNames(styles.responsiveTitle2, className)} {...rest} />
);

export const SectionSubTitle = ({ className, ...rest }) => (
  <h3 className={classNames(styles.responsiveTitle3, className)} {...rest} />
);

export const Paragraph = ({ className, ...rest }) => (
  <p className={classNames(styles.paragraph, className)} {...rest} />
);
