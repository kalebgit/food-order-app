import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.scss'

//routes
import Root from './routes/Root/Root'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    // errorElement: ,
    children: [
      {

      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
