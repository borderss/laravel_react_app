import React from "react";
import { loginUser } from './util.js'

function login(props) {
  return (
    <>
    <h2>Login</h2>
    <form onSubmit={(e) => {
        e.preventDefault()
        let response = loginUser(e.target.email.value, e.target.password.value)
        console.log(response)
        props.onChange(response)
      }}>
      <input type="email" name="email" placeholder="email@example.com"/>
      <input type="password" name="password" placeholder="password"/>
      <br/>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default login