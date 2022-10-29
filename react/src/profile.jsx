import React, { useEffect, useState, useCallback } from "react";
import { userExists, getUser } from './util.js'

import Login from "./login"
import Logout from "./logout"
import Register from "./register"
import PostField from "./postField"

function profile() {
  const [isloggedIn, setIsLoggedIn] = useState(userExists())
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    setIsLoggedIn(userExists())
  }, [isloggedIn])

  function handleChange(newState){
    setUser(newState)
  }

  if (isloggedIn) {
    return (
      <>
      You are logged in<br/>
      <Logout onChange={handleChange}/>
      <PostField/>
      </>
    )
  } else {
    return (
      <>
      You are not logged in<br/>
      <Login onChange={handleChange}/>
      <Register onChange={handleChange}/>
      </>
    )
  }
}

export default profile