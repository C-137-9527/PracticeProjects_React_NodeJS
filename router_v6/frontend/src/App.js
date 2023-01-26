import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import HomePage from './pages/HomePage';
import EventsPage, { loader as eventsLoader } from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';
import EventDetailPage from './pages/EventDetailPage';
import EditEventPage from './pages/EditEventPage';
import Error from './pages/Error';
import { eventItemLoader, deleteAction } from './pages/EventDetailPage';
import { action } from './pages/NewEventPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        children: [
          {
            index: true,
            loader: eventsLoader,
            element: <EventsPage />,
          },
          { path: 'new', element: <NewEventPage />, action },
          {
            path: ':id',
            loader: eventItemLoader,
            id: 'eventItemLoader',
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
