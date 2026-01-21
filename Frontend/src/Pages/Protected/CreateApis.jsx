import React, { useState } from 'react'
import { CircleQuestionMark } from 'lucide-react'
import axios from 'axios'

function CreateApis() {

  const [apiName, setApiName] = useState("")
  const [procedure, setProcedure] = useState("")
  const [dbUser, setDbUser] = useState("")
  const [dbPassword, setDbPassword] = useState("")
  const [dbHost, setDbHost] = useState("")
  const [dbPort, setDbPort] = useState("")
  const [serviceName, setServiceName] = useState("")
  const [httpMethod, setHttpMethod] = useState("")
  const [loading, setLoading] = useState(false)

  const createApi = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.post('http://localhost:7000/admin/create-api', {
        apiName,
        httpMethod,
        procedure,
        dbUser,
        dbPassword,
        dbHost,
        dbPort,
        serviceName
      })

      alert("API created successfully")
      setApiName("");
      setProcedure("");
      setDbUser("");
      setDbPassword("");
      setDbHost("");
      setDbPort("");
      setServiceName("");


    } catch (err) {
      console.error(err)
      alert("Failed to create API")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-purple-50">
      <form
        onSubmit={createApi}
        className="bg-white border border-purple-300 rounded-2xl shadow-lg p-8 w-[600px]"
      >

        <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
          Create New Custom API
        </h1>

        <div className="space-y-5">

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="API Name"
              value={apiName}
              onChange={(e) => setApiName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={28} className="text-purple-600" />
          </div>

          <div className='flex space-x-3'>
            <select
              value={httpMethod}
              onChange={(e) => setHttpMethod(e.target.value)}
              className="border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded px-3 py-2 text-gray-400">
              <option value="" disabled hidden>HTTP method</option>
              <option value="GET" className="text-black">GET</option>
              <option value="POST" className="text-black">POST</option>
              <option value="PUT" className="text-black">PUT</option>
              <option value="DELETE" className="text-black">DELETE</option>
            </select>
          </div>
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Procedure Name"
              value={procedure}
              onChange={(e) => setProcedure(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={28} className="text-purple-600" />
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="DB User"
              value={dbUser}
              onChange={(e) => setDbUser(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={28} className="text-purple-600" />
          </div>

          <div className="flex space-x-3">
            <input
              type="password"
              placeholder="Password"
              value={dbPassword}
              onChange={(e) => setDbPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={28} className="text-purple-600" />
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="DB Host IP"
              value={dbHost}
              onChange={(e) => setDbHost(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={28} className="text-purple-600" />
          </div>

          <div className="flex space-x-3">
            <input
              type="number"
              placeholder="Port Number"
              value={dbPort}
              onChange={(e) => setDbPort(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={28} className="text-purple-600" />
          </div>

          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="Service Name"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <CircleQuestionMark size={28} className="text-purple-600" />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition"
            >
              {loading ? "Saving..." : "Save API"}
            </button>

            <button
              type="reset"
              className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
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
