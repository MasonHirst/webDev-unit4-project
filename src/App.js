import { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import AuthContext from './store/authContext'
import Header from './components/Header'
import Home from './components/Home'
import Auth from './components/Auth'
import Form from './components/Form'
import Profile from './components/Profile'

const App = () => {
   const authCtx = useContext(AuthContext)
   
   useEffect(() => {
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('expirationTime')
   }, [])
   
  return (
    <div className='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={!authCtx.token ? <Auth/> : <Navigate to='/' />}/>
        <Route path='/form' element={authCtx.token ? <Form/> : <Navigate to='/auth' />}/>
        <Route path='/profile' element={authCtx.token ? <Profile/> : <Navigate to='/auth'/>}/>
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </div>
  )
}

export default App