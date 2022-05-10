import React from 'react';

// css module
import styles from './Main.module.css';

// image
import dogImage from '../../assets/dog2.png';

const Main = () => {
  return (
    <main className={styles.main}>
      {/* background colored stripes */}
      <div className={styles.stripes}></div>

      {/* description */}
      <div className={styles.description}>
        <h3>Front-end developer</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel quae
          veritatis molestiae delectus asperiores reprehenderit. Sed ea cum
          similique ab!
        </p>
      </div>

      {/* dev */}
      <p className={styles.dev}>DEV</p>

      {/* image */}
      <img src={dogImage} alt='dog img' />
    </main>
  );
};

export default Main;
