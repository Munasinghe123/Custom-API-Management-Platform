import React from 'react'

import { CircleQuestionMark } from 'lucide-react';

function CreateApis() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-purple-50">
      <form className="bg-white border border-purple-300 rounded-2xl shadow-lg p-8 w-[600px]">

        <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
          Create New Custom API
        </h1>

        <div className='space-y-5'>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="API Name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <CircleQuestionMark size={40} className='text-purple-600 ' />
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Procedure Name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={40} className='text-purple-600 ' />
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="DB User"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={40} className='text-purple-600 ' />
          </div>

          <div className="flex space-x-3">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={40} className='text-purple-600 ' />
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="DB Host IP"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={40} className='text-purple-600 ' />
          </div>

          <div className="flex space-x-3">
            <input
              type="number"
              placeholder="Port Number"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={40} className='text-purple-600 ' />
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Service Name"
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={40} className='text-purple-600 ' />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition duration-200"
            >
              Save API
            </button>

            <button
              type="reset"
              className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-100 transition duration-200"
            >
              Clear
            </button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default CreateApis
