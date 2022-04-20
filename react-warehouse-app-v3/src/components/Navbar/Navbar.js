import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { GrStorage } from 'react-icons/gr';
import { IoMdOptions } from 'react-icons/io';

import { data } from '../../context/data';

import classes from './Navbar.module.css';

const Navbar = () => {
  // access data in data.js
  const ctx = useContext(data);

  // toggle login window
  const [showLoginWindow, setShowLoginWindow] = useState(false);

  // toggle login window based on if user is logged in or not
  useEffect(() => {
    if (ctx.userIsLoggedIn) setShowLoginWindow(false);

    if (!ctx.userIsLoggedIn) setShowLoginWindow(true);
  }, [ctx.userIsLoggedIn]);

  // toggle logout window
  const [showLogoutWindow, setShowLogoutWindow] = useState(false);

  // login input ref
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // login or logout handler
  const loginLogoutHandler = async (e) => {
    e.preventDefault();

    // if user is not logged in, log in user
    if (!ctx.userIsLoggedIn) {
      try {
        const res = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXQrVU8yxbA44iuKd_glovSnPWGjDYaeo',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: emailInputRef.current.value,
              password: passwordInputRef.current.value,
              returnSecureToken: true,
            }),
          }
        );

        const data = await res.json();

        if (data.error) throw new Error(data.error.message);

        if (data.idToken) {
          // save idToken in local storage
          localStorage.setItem('ktransIdToken', data.idToken);

          ctx.setUserIsLoggedIn(true);
        }
      } catch (error) {
        alert(error.message);
      }
    }

    // if user is logged in, log out user
    if (ctx.userIsLoggedIn) {
      // delete idToken in local storage
      localStorage.removeItem('ktransIdToken');

      ctx.setUserIsLoggedIn(false);

      setShowLogoutWindow(false);
    }
  };

  return (
    <nav className={classes.navbar}>
      <ul>
        <li className={classes.logo}>K-trans</li>
        {/* navlink: storage detials page */}
        <li>
          <NavLink
            to='/'
            className={(current) =>
              current.isActive ? classes.active : classes.navlink
            }
          >
            <GrStorage className={classes.icon} />
            Storage Details
          </NavLink>
        </li>

        {/* navlink: manageOptions page */}
        <li>
          <NavLink
            to='/manageOptions'
            className={(current) =>
              current.isActive ? classes.active : classes.navlink
            }
          >
            <IoMdOptions className={classes.icon} />
            Manage Options
          </NavLink>
        </li>

        {/* icon: user login logout */}
        <li>
          <FaUserAlt
            className={classes.user}
            onClick={() => {
              // if user is not logged in, show login window
              if (!ctx.userIsLoggedIn) setShowLoginWindow(true);

              // if user is logged in, show logout window
              if (ctx.userIsLoggedIn) {
                setShowLogoutWindow(true);
              }
            }}
          />
        </li>
      </ul>

      {/* login window */}
      {showLoginWindow && (
        <form className={classes.loginWindow} onSubmit={loginLogoutHandler}>
          <div className={classes.inputs}>
            <input
              required
              type='email'
              placeholder='email'
              ref={emailInputRef}
            />
            <input
              required
              type='password'
              placeholder='password'
              ref={passwordInputRef}
            />
          </div>

          <div className={classes.buttons}>
            <button type='submit'>login</button>
            <button onClick={() => setShowLoginWindow(false)}>cancel</button>
          </div>
        </form>
      )}

      {/* logout window */}
      {showLogoutWindow && (
        <div className={classes.logoutWindow}>
          <h2>logout?</h2>

          <div className={classes.buttons}>
            <button onClick={loginLogoutHandler}>yes</button>
            <button onClick={() => setShowLogoutWindow(false)}>no</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
