import React from 'react';
import classNames from 'classnames';

import styles from './container.module.css';

const Container = ({ className, align, children }) => {
  return (
    <div
      className={classNames(
        styles.root,
        { [styles.center]: align === 'center' },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
