import React, { useEffect, useState, useCallback } from "react";
import { userExists, getUser } from './util.js'

import Login from "./login"
import Logout from "./logout"
import Register from "./register"

function profile() {
  const [isloggedIn, setIsLoggedIn] = useState(userExists())
  const [user, setUser] = useState(getUser())

  useEffect(() => {
    setIsLoggedIn(userExists())
  }, [isloggedIn])

  function handleChange(newState){
    setUser(newState)
  }

  let prompt
  if (isloggedIn) {
    prompt = <><Login/><br/><Register/></>
  } else {
    prompt = <Register/>
  }

  return (
    <div>
      You {isloggedIn ? "are" : "are not"} logged in<br/>
      {isloggedIn ? <Logout onChange={handleChange}/> : <><Login onChange={handleChange}/><br/><Register onChange={handleChange}/></> }
    </div>
  )
}

export default profile