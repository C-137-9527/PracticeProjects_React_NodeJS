import React from 'react';
import classes from './Character.module.css';
import Head from './Head/Head';
import Body from './Body/Body';
import Feet from './Feet/Feet';
import PortfolioMessage from '../ModalMessage/PortfolioMessage/PortfolioMessage';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

const Character = ({ viewportRef }) => {
  // update character walking animation
  const [isWalking, setIsWalking] = useState(false);

  // update moving direction
  const [moveUp, setMoveUp] = useState(false);
  const [moveDown, setMoveDown] = useState(false);
  const [moveLeft, setMoveLeft] = useState(false);
  const [moveRight, setMoveRight] = useState(false);

  // use interval to smoothly move character
  const [movingInterval, setmMovingInterval] = useState(null);

  // get charcter element to calculate character location coordinates
  const characterRef = useRef();

  // toggle modal message
  const [showModal, setShowModal] = useState(false);

  // prevent setShowModal from triggering if character is already standing in welcome message
  const [alreadyInCircle, setAlreadyInCircle] = useState(false);

  // on page load, listen to keydown and keyup to update direction
  useEffect(() => {
    // listen to keydown
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      // if not arrow key, return
      if (!e.key.includes('Arrow')) return;

      // activate movement direction based on arrow key
      if (e.key === 'ArrowUp') setMoveUp(true);
      if (e.key === 'ArrowDown') setMoveDown(true);
      if (e.key === 'ArrowLeft') setMoveLeft(true);
      if (e.key === 'ArrowRight') setMoveRight(true);
    });

    // listen to keyup
    window.addEventListener('keyup', (e) => {
      // if not arrow key, return
      if (!e.key.includes('Arrow')) return;

      // deactivate movement direction based on arrow key
      if (e.key === 'ArrowUp') setMoveUp(false);
      if (e.key === 'ArrowDown') setMoveDown(false);
      if (e.key === 'ArrowLeft') setMoveLeft(false);
      if (e.key === 'ArrowRight') setMoveRight(false);
    });
  }, [moveUp, moveDown, moveLeft, moveRight]);

  // on direction change, update walking animation
  useEffect(() => {
    if (moveUp || moveDown || moveLeft || moveRight) {
      // if has any direction, start walking animation
      setIsWalking(true);
    } else {
      // else, cancel walking animation
      setIsWalking(false);
    }
  }, [moveUp, moveDown, moveLeft, moveRight]);

  // move character towards active direction
  useEffect(() => {
    // get character element
    const character = characterRef.current;

    // create interval when any arrow key is pressed
    setmMovingInterval(
      // interval called every 0 sec
      setInterval(() => {
        // get character current location coordinates
        const topCoordinates = character.offsetTop;
        const bottomCoordinates = topCoordinates + character.offsetHeight;
        const leftCoordinates = character.offsetLeft;
        const rightCoordinates = leftCoordinates + character.offsetWidth;

        // if arrow up is pressed
        if (moveUp && !moveDown) {
          // if character has not reached top boundary, keep moving up
          if (topCoordinates > 120) {
            character.style.top = topCoordinates - 0.8 + 'px';

            // scroll viewport to focus on character
            viewportRef.current.scrollBy(0, -1);
          }
        }

        // if arrow down is pressed
        if (moveDown && !moveUp) {
          // if character has not reached bottom boundary, keep moving down
          if (bottomCoordinates < 720) {
            character.style.top = topCoordinates + 0.8 + 'px';

            // scroll viewport to focus on character
            viewportRef.current.scrollBy(0, 1);
          }
        }

        // if arrow left is pressed
        if (moveLeft && !moveRight) {
          // if character has not reached left boundary, keep moving left
          if (leftCoordinates > 25) {
            character.style.left = leftCoordinates - 0.8 + 'px';

            // scroll viewport to focus on character
            viewportRef.current.scrollBy(-1, 0);
          }
        }

        // if arrow down is pressed
        if (moveRight && !moveLeft) {
          // if character has not reached right boundary, keep moving right
          if (rightCoordinates < 1020) {
            character.style.left = leftCoordinates + 0.8 + 'px';

            // scroll viewport to focus on character
            viewportRef.current.scrollBy(1, 0);
          }
        }

        // change character z-index based on location coordinates, before or behind the welcome message
        if (bottomCoordinates > 520) {
          character.style.zIndex = '100';
        } else {
          character.style.zIndex = '98';
        }

        // if character overlap with welcome message, toggle modal on
        if (
          bottomCoordinates >= 480 &&
          bottomCoordinates <= 530 &&
          leftCoordinates >= 450 &&
          rightCoordinates <= 600 &&
          !alreadyInCircle
        ) {
          // toggle modal on
          setShowModal(true);

          // prevent setShowModal from triggering again
          setAlreadyInCircle(true);
        }

        // allow setShowModal to trigger again if character has left the circle
        if (
          bottomCoordinates < 420 ||
          bottomCoordinates > 590 ||
          leftCoordinates < 390 ||
          rightCoordinates > 660
        )
          setAlreadyInCircle(false);
      }, 0)
    );

    // clear interval if no arrow key is pressed
    if (!moveUp || !moveDown || !moveLeft || !moveRight)
      clearInterval(movingInterval);
  }, [moveUp, moveDown, moveLeft, moveRight]);

  const portal = document.getElementById('modal');

  return (
    <>
      <div className={classes.character} ref={characterRef}>
        <Head isWalking={isWalking} />
        <Body isWalking={isWalking} />
        <Feet isWalking={isWalking} />
      </div>

      {/* toggle modal */}
      {showModal &&
        createPortal(
          <PortfolioMessage onSetShowModal={setShowModal} />,
          portal
        )}
    </>
  );
};

export default Character;
