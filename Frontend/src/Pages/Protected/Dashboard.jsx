import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

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
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-purple-50">

      <h1 className="text-center pt-10 text-3xl font-bold text-purple-700">
        Dashboard
      </h1>

    
    </div>
  )
}

export default Dashboard
