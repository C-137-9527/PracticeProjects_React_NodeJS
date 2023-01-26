import React from 'react';
import { Outlet, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

export default function EventDetailPage() {
  const { event } = useRouteLoaderData('eventItemLoader');

  return (
    <div>
      <EventItem event={event} />
      <Outlet />
    </div>
  );
}

export const eventItemLoader = async ({ req, params }) => {
  const response = await fetch(`http://localhost:8080/events/${params.id}`);

  if (!response.ok) throw response;

  return response;
};

export const deleteAction = async ({ req, params }) => {
  const response = await fetch(`http://localhost:8080/events/${params.id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw response;

  return redirect('/events');
};
