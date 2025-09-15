import React, { useState } from 'react'

function SignUp() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function sendSignIn(userName, email, password) {
    try {
      const res = await fetch('http://localhost:8000/auth/signup', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, email, password })
      })
      const data = await res.json()
      localStorage.setItem("token", data.token)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <label htmlFor="userName">enter the userName</label>
      <input type="text" id="userName" onChange={(e) => setUserName(e.target.value)} />
      <label htmlFor="email">enter the email</label>
      <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password">enter the password</label>
      <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => sendSignIn(userName, email, password)}>Sign In</button>
    </div>
  )
}

export default SignUp