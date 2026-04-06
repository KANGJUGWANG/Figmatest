import React from 'react';
import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { SearchPage } from './pages/SearchPage';
import { ResultsPage } from './pages/ResultsPage';
import { DetailsPage } from './pages/DetailsPage';
import { TrackedPage } from './pages/TrackedPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: SearchPage,
      },
      {
        path: 'results',
        Component: ResultsPage,
      },
      {
        path: 'details/:id',
        Component: DetailsPage,
      },
      {
        path: 'tracked',
        Component: TrackedPage,
      },
    ],
  },
]);
