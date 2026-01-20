import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LandingPage from './Pages/LandingPage'
import Header from './Components/Header'
import Login from './Pages/Login'
import Dashboard from './Pages/Protected/Dashboard'
import CreateApis from './Pages/Protected/CreateApis'
import Footer from './Components/Footer'
import ManageApis from './Pages/Protected/ManageApis'
import TestApis from './Pages/Protected/TestApis'

function App() {
  return (
    <BrowserRouter>

      <div>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-apis" element={<CreateApis />} />
          <Route path="/manage-apis" element={<ManageApis />} />
          <Route path="/test-apis" element={<TestApis />} />
        </Routes>
        <Footer />
      </div>

    </BrowserRouter>

  )
}

export default App
