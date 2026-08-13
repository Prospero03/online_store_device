import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const server = useSelector((state) => state.prod.link)
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${server}/api/admin`, {
          withCredentials: true,
        })
        setData(res.data)
      } catch (error) {
        navigate('/')
      }
    }

    fetch()
  }, [server])

    if (!data) {
      return <div>Загрузка</div>
    }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data.message}</p>
    </div>
  )
}

export default Dashboard