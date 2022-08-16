import React from 'react';
import classes from './Playground.module.css';
import Buildings from './Buildings/Buidings';
import Fence from './Fence/Fence';
import Ground from './Ground/Ground';
import Character from '../Character/Character';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';

const Playground = ({ viewportRef }) => {
  return (
    <div className={classes.playground}>
      <Buildings />
      <Ground />
      <Fence />
      <WelcomeMessage />
      <Character viewportRef={viewportRef} />
    </div>
  );
};

export default Playground;
