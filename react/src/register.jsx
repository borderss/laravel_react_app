import React, { useState } from "react";
import { registerUser } from './util.js'

function register(props) {
  return (
    <>
    <h2>Register</h2>
    <form onSubmit={(e) => {
        e.preventDefault()
        let response = registerUser(e.target.name.value, e.target.email.value, e.target.password.value)
        console.log(response)
        props.onChange(response)
      }}>
      <input type="text" name="name" placeholder="username"/>
      <input type="email" name="email" placeholder="email@example.com"/>
      <input type="password" name="password" placeholder="password"/>
      <br/>
      <button type="submit">Submit</button>
    </form>
    </>
  );
}

export default register