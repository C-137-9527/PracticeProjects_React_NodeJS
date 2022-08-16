import React from 'react';
import classes from './Viewport.module.css';
import Playground from '../Playground/Playground';

import { useRef, useEffect } from 'react';

// viewport: the window to look through everything
const Viewport = () => {
  // get viewport element
  const viewportRef = useRef(null);

  // on page load, scroll viewport into ideal position
  useEffect(() => {
    viewportRef.current.scrollTo({ left: 510, top: 260, behavior: 'smooth' });
  }, []);

  return (
    // the view window
    <div ref={viewportRef} className={classes.viewport}>
      {/* the blue sky background */}
      <div className={classes.sky}>
        {/* playground + character */}
        <Playground viewportRef={viewportRef} />
      </div>
    </div>
  );
};

export default Viewport;
