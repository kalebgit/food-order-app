

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

//styles
import './index.scss'

//fonts
import '@fontsource/inter';

//routes
import Root from './routes/Root/Root'
import Account from './routes/Account/Account';
import Welcome from './routes/Welcome/Welcome'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    // errorElement: ,
    children: [
      {
        path: "/",
        element: <Account/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
