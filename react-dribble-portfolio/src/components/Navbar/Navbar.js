import React from 'react';

// css module
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* name + title */}
      <div>
        <h2>Alvin Zhang</h2>
        <h4>front-end developer</h4>
      </div>

      {/* more */}
      <ul>
        <li>contact</li>
        <li>download cv</li>
        <li>home</li>
      </ul>
    </nav>
  );
};

export default Navbar;
