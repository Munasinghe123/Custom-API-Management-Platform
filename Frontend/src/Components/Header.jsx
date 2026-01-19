import React from 'react'
import Logo from '../../Images/Leco.png'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import User from '../../Images/user.jpg';
import { ChevronDown } from 'lucide-react';
import axios from 'axios';

function Header() {

  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:7000/api/get-employee-details",
          { emp_no: 102 }
        )
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className=' h-24 bg-purple-600 flex items-center justify-between px-10'>
      <Link to="/">
        <div className='flex space-x-5 '>
          <img src={Logo} alt="Logo" className="h-16 w-16" />
          <p className='text-white flex items-center font-bold'>Custom API Portal</p>
        </div>
      </Link>

      <div className="space-x-6">
        <Link to="/test-apis">
          <button className="bg-purple-800 border border-purple-500 text-white cursor-pointer px-4 py-2 rounded-md shadow-md hover:bg-purple-900 hover:shadow-lg hover:-translate-y-0.5 transition duration-200 transform">
            Test APIs
          </button>
        </Link>

        <Link to="/create-apis">
          <button className="bg-purple-800 border border-purple-500 text-white cursor-pointer px-4 py-2 rounded-md shadow-md hover:bg-purple-900 hover:shadow-lg hover:-translate-y-0.5 transition duration-200 transform">
            Create APIs
          </button>
        </Link>

        <Link to="/manage-apis">
          <button className="bg-purple-800 border border-purple-500 text-white cursor-pointer px-4 py-2 rounded-md shadow-md hover:bg-purple-900 hover:shadow-lg hover:-translate-y-0.5 transition duration-200 transform">
            Manage APIs
          </button>
        </Link>
      </div>


      <div className='flex space-x-4 items-center'>

        <Link to="/login">
          <button className='bg-white text-purple-800 cursor-pointer px-4 py-2 rounded-md'>Login</button>
        </Link>

        <div className='relative'>
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-purple-700 border border-purple-500 shadow-md cursor-pointer hover:shadow-xl hover:bg-purple-600 hover:-translate-y-0.5 transition duration-200 transform"
          >
            <img src={User} alt="User" className="h-10 w-10 rounded-full border-2 border-white object-cover" />
            <ChevronDown size={18} className={`text-white transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </div>

          {open && (
            <div className="absolute top-20 right-2 bg-purple-700 border border-purple-500 rounded-xl shadow-xl px-4 py-2 text-white w-48">
              {data ? (
                <div className='flex flex-col space-y-2'>
                  <p className="font-semibold ">Welcome, {data.name}</p>
                  <button className='bg-red-500 text-whitecursor-pointer px-4 py-2 rounded-md'>Logout</button>
                </div>
              ) : (
                <p className="text-sm">Loading data...</p>
              )}
            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default Header
