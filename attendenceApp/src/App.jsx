import { useState } from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Reports from './pages/Reports'
import Admin from './pages/Admin'
import UserReports from './pages/UserReports'


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path={'/home'} element={<Home/>}/>
        <Route path={'/register'} element={<Register/>}/>
        <Route path={'/reports'} element={<Reports/>}/>
        <Route path={'/admin'} element={<Admin/>}/>
        <Route path={'/userReports/:id'} element={<UserReports/>}/>
      </Routes>
    </Router>
  )
}

export default App