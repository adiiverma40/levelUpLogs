import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider,Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Provider} from "react-redux"

import { Home, Login, Profile, SignUp } from "./pages/index.js"
import store from './Store/Store.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
 
      <Route index element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/profile' element={<Profile/>}/>
      

    </Route>
  )
)





createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <RouterProvider router={router} />
  </Provider>



)
