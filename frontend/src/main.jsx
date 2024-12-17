import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Home, Login, SignUp } from "./pages/index.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
 
      <Route index element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>

    </Route>
  )
)





createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />



)
