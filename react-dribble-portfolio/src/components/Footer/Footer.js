import React from 'react';

// css module
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul>
        <li>about</li>
        <li>work</li>
        <li>certificates</li>
      </ul>
    </footer>
  );
};

export default Footer;
