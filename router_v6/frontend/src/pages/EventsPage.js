import { Outlet, json, useLoaderData } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

import EventsList from '../components/EventsList';

function EventsPage() {
  const events = useLoaderData();

  return (
    <>
      <EventsNavigation />
      <EventsList events={events.events} />
      <Outlet />
    </>
  );
}

export default EventsPage;

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) throw response;

  return response;
};
