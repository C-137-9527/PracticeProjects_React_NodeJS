import React from 'react';
import classes from './ProjectDescription.module.css';

const ProjectDescription = () => {
  return (
    <div className={classes.description}>
      <ul>
        <li>by: Alvin Zhang</li>
        <li>
          react source code:{' '}
          <a
            href='https://github.com/C-137-9527/Portfolio'
            target='_blank'
            rel='noreferrer'
          >
            Github Repo
          </a>
        </li>
        <li>
          inspired by:{' '}
          <a
            href='https://codepen.io/punkydrewster713/pen/WNrXPrb'
            target='_blank'
            rel='noreferrer'
          >
            Drew Conley
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ProjectDescription;
