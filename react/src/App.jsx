import { useState, useEffect } from 'react'
import './App.css'

const apiMethod = async (url="", requestParams, callback) => {
  const response = await fetch(url, requestParams)
  const data = await response.json()
  callback(data)
}

const setLS = (key, value) => {
  window.localStorage.setItem(key, json.stringify(value))
}

const getLS = (key) => {
  let value = window.localStorage.getItem(key)

  return (value) ? JSON.parse(value) : null
}

function App() {
  const [data, setData] = useState(null)
  const [userID, setUserID] = useState(0)

  useEffect(() => {
    apiMethod("http://127.0.0.1:8000/api/login",{
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "email": "user@gmail.com", "password": "password"})
    }, setData)
  }, [])

  return (
    <div className="App">
      {JSON.stringify(data)}
    </div>
  )
}

export default App
