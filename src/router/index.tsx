import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import ManageLayout from '../layout/ManageLayout'
import List from '../pages/List'
import Star from '../pages/manage/Star'
import ManageList from '../pages/manage/List'
import ManageTrash from '../pages/manage/Trash'
import QuestionLayout from '../layout/QuestionLayout'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/stat'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: 'register',
          element: <Register />,
        },
        {
          path: 'manage',
          element: <ManageLayout />,
          children: [
            {
              path: 'list',
              element: <ManageList />,
            },
            {
              path: 'star',
              element: <Star />,
            },
            {
              path: 'trash',
              element: <ManageTrash />,
            },
          ],
        },

        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
    {
      path: 'question',
      element: <QuestionLayout />,
      children: [
        {
          path: 'edit/:id',
          element: <Edit />,
        },
        {
          path: 'stat/:id',
          element: <Stat />,
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
      v7_partialHydration: true,
    },
  }
)

export default router
