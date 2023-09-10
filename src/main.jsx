

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
import Home from './routes/Home/Home';

import AdminHome from './routes/Admin/AdminHome/AdminHome';
import AdminProduct from './routes/Admin/AdminProduct/AdminProduct/AdminProduct';
import Cart from './routes/Cart/Cart';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    // errorElement: ,
    children: [
      {
        path: "/",
        element: <Account/>
      },
      {
        path: "/home",
        element: <Home/>
      }, 
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "/admin",
        element: <AdminHome/>,
        children: [
          {
            path: "/admin/product",
            element: <AdminProduct/>
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
