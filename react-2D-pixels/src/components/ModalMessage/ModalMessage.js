import React from 'react';
import SmallScreenAlert from './SmallScreenAlert/SmallScreenAlert';
import ProjectDescription from './ProjectDescription/ProjectDescription';
import { useState, useEffect } from 'react';

const ModalMessage = () => {
  // track screen size to toggle message
  const [smallScreen, setSmallScreen] = useState(true);

  // toggle modal on off handler
  const toggleModal = () => {
    if (window.innerWidth < 1250) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  // call handler at page load and on resize
  useEffect(() => {
    toggleModal();

    window.addEventListener('resize', () => {
      toggleModal();
    });
  }, []);

  return (
    <div>
      {/* on large screen show project description */}
      {!smallScreen && <ProjectDescription />}

      {/* on small screen show alert message */}
      {smallScreen && <SmallScreenAlert />}
    </div>
  );
};

export default ModalMessage;
