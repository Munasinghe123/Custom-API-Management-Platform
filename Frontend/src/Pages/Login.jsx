import React, { useState } from 'react'
import Logo from '../../Images/Leco.png'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login clicked!');
  };

  return (
    <div className='bg-gradient-to-br from-purple-100 to-purple-200 min-h-screen flex items-center justify-center'>
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 flex flex-col border border-purple-300">

        <div className="h-16 w-16 mx-auto mb-4 bg-purple-300 rounded-full flex items-center justify-center">
          <span className="text-2xl"><img src={Logo} alt="Logo" className="h-20 w-16" /></span>
        </div>

        <h1 className="text-purple-600 text-lg font-bold text-center">
          Custom API Portal
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Admin Login
        </p>

        <div className="relative mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <label
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              usernameFocused || username
                ? '-top-2.5 text-xs bg-white px-1 text-purple-600'
                : 'top-2 text-gray-500'
            }`}
          >
            Username
          </label>
        </div>

        <div className="relative mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <label
            className={`absolute left-4 transition-all duration-200 pointer-events-none ${
              passwordFocused || password
                ? '-top-2.5 text-xs bg-white px-1 text-purple-600'
                : 'top-2 text-gray-500'
            }`}
          >
            Password
          </label>
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Login
        </button>

        <p className='text-gray-400 text-sm mt-6 text-center'>Can't login? Please contact your administrator</p>

      </div>
    </div>
  )
}

export default Login