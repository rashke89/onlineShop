import axios from 'axios'
import React, { useEffect } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import './assets/scss/base.scss'

import { Routes, Route, useNavigate } from 'react-router-dom'
import Shop from './pages/Shop/Shop'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Navigation from './components/navigation/Navigation'
import Home from './pages/Home/Home'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/userSlice'
import ActivateUserPage from './pages/ActivateUserPage/ActivateUserPage'
import AdPage from './pages/AdPage/AdPage'
import { routeConfig } from './config/routeConfig'
import CookiesModal from './components/cookies/CookiesModal'

export const IsLoggedContext = React.createContext()
axios.defaults.baseURL = 'http://localhost:4000'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (!localStorage.hasOwnProperty('user')) {
      // navigate('/auth');
    } else {
      dispatch(setUser(JSON.parse(localStorage.getItem('user'))))
    }
  }, [])

  return (
    <div className='main-wrapper'>
      <CookiesModal />
      <Navigation />
      <Routes>
        <Route path={routeConfig.HOME.url} element={<Home />} />
        <Route path={routeConfig.SHOP.url} element={<Shop />} />
        <Route path={routeConfig.AD_SHOP.url} element={<AdPage />} />
        <Route path={routeConfig.ABOUT.url} element={<About />} />
        <Route path={routeConfig.CONTACT.url} element={<Contact />} />
        <Route path={routeConfig.AUTH.url} element={<AuthPage />} />
        <Route
          path={routeConfig.USER_ACTIVATE.url}
          element={<ActivateUserPage />}
        />
      </Routes>
    </div>
  )
}

export default App
