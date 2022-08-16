import React from 'react';
import classes from './PortfolioMessage.module.css';
import { useState } from 'react';

const PortfolioMessage = ({ onSetShowModal }) => {
  // toggle downward arrow on user scroll
  const [showScroll, setShowScroll] = useState(true);

  // toggle modal off handler
  const handleHideModal = () => {
    onSetShowModal(false);
  };

  // listen to scroll event to toggle showScroll
  const handleShowScroll = () => {
    setShowScroll(false);
  };

  return (
    <>
      {/* backdrop */}
      <div className={classes.backdrop} onClick={handleHideModal}></div>

      {/* modal */}
      <div className={classes.portfolioMessage} onScroll={handleShowScroll}>
        {/* welcome message */}
        <section className={classes.welcome}>
          <h3>WHATS UP!</h3>
        </section>
      </div>
    </>
  );
};

export default PortfolioMessage;
