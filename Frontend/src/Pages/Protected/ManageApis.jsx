import { useEffect, useState } from 'react'
import axios from 'axios'

function ManageApis() {
  const [apis, setApis] = useState([])

  useEffect(() => {
    axios.get('http://localhost:7000/admin/get-apis')
      .then(res => setApis(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="p-10 h-screen">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">
        Existing APIs
      </h1>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead className="bg-purple-100">
          <tr>
            <th className="p-3 text-left">API Name</th>
            <th className="p-3 text-left">Procedure</th>
            <th className="p-3 text-left">DB User</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {apis.map(api => (
            <tr key={api.apiName} className="border-t">
              <td className="p-3">{api.apiName}</td>
              <td className="p-3">{api.procedure}</td>
              <td className="p-3">{api.dbUser}</td>
              <td className='space-x-2'>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
                  Delete
                </button> 

                 <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-200">
                  Edit
                </button> 

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ManageApis
