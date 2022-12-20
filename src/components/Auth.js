import React, { useState, useContext } from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

const Auth = () => {
   const authContext = useContext(AuthContext)
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(false)

   const submitHandler = (e) => {
      e.preventDefault()
      console.log('submitHandler called')
      let baseURL = 'http://localhost:3222'

      if (username && password) {
         axios
            .post(register ? `${baseURL}/register` : `${baseURL}/login`, {
               username,
               password,
            })
            .then((res) => {
               let { token, exp, userId } = res.data
               console.log('.then ran')
               console.log(res.data)
               authContext.login(token, exp, userId)
            })
            .catch((err) => {
               console.log('.err ran')
               console.log(err)
               setPassword('')
               setUsername('')
            })
      } else {
         alert('username and password fields cannot be empty!')
      }
   }

   const toggleRegister = () => {
      if (register === true) {
         setRegister(false)
      } else {
         setRegister(true)
      }
   }

   return (
      <main>
         <h1>Welcome!</h1>
         <form className="form auth-form" onSubmit={submitHandler}>
            <input
               type="text"
               className="form-input"
               placeholder="Username"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
            />
            <input
               type="password"
               className="form-input"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <button className="form-btn">
               {register ? 'Sign Up' : 'Login'}
            </button>
         </form>
         <button className="form-btn" onClick={toggleRegister}>
            Need to {register ? 'Login' : 'Sign Up'}?
         </button>
      </main>
   )
}

export default Auth
