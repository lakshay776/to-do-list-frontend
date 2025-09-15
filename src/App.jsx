import React from 'react'
import { Route, Routes } from 'react-router-dom'  // Changed from 'react-router'
import ToDo from './pages/ToDo.jsx'
// import SignIn from './pages/signIn.jsx'
// import SignUp from './pages/signUp.jsx'
import { Navigate } from 'react-router-dom'
function App() {
  return (
    <div>
      <Routes>
        {/* <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} /> */}
         <Route path="/" element={<Navigate to="/todos" replace />} />
        <Route path="/todos" element={<ToDo />} />
      </Routes>
    </div>
  )
}

export default App