import React, { useState } from "react";
import { logoutUser } from './util.js'


function logout(setUserState) {
  return (
    <button onClick={() => {
      logoutUser()
    }}>
      log out
    </button>
  )
}

export default logout