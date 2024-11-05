import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '@/App';

const router = createBrowserRouter([
    {
        path: '*',
        element: <App />,
        children: [
            {
                path: 'list',
                Component: lazy(() => import('@/pages/List'))
            },
            {
                path: 'add',
                Component: lazy(() => import('@/pages/Add'))
            },
            {
                path: 'order',
                Component: lazy(() => import('@/pages/Order'))
            }
        ]
    }
]);

export default router;
