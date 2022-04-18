import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { GrStorage } from 'react-icons/gr';
import { IoMdOptions } from 'react-icons/io';

import classes from './Navbar.module.css';

const Navbar = () => {
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
          <FaUserAlt className={classes.user} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
