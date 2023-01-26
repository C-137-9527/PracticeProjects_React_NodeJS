import classes from './EventsNavigation.module.css';
import { NavLink } from 'react-router-dom';

function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <NavLink to='/events'>All Events</NavLink>
          <NavLink to='/events/new'>New Event</NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
