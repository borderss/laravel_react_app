import React, { useEffect } from "react";
import { useState } from "react";
import { apiMethod, userExists, getToken } from './util.js'

function posts() {
  const [posts, setPosts] = useState(null)

  function outputPost(){
    const output = new Array()

    posts.forEach(post => {
      output.push(
        <>
          <span style={{"font-weight": 'bold', "margin-inline": "5px"}}> #{post.id}</span> <span style={{"font-weight": 'bold'}}>{post.title}</span> posted by <span style={{"font-weight": 'bold'}}>{post.user.name}</span>
          <p style={{"margin-left": "15px"}}>
            {post.desc}
          </p>
        </>
      )
  
      Object.entries(post.comments).forEach(comment => {
        output.push(
          <div style={{"padding-left": "25px", "border-left": "2px solid"}}>
            posted by <span style={{"font-weight": 'bold'}}>{comment[1].user.name}</span>
            <p style={{"padding-left": '10px'}}>{comment[1].comment}</p>
          </div>
        )
      })
    })
  
    return output
  }

  useEffect(() => {
    if (userExists()) {
      apiMethod("http://127.0.0.1:8000/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`
        }
      }).then((data) => {
        setPosts(Array.from(data.data))
      })
    } else {
      console.warn("getting posts without an user existing")
      return null
    }
  }, [])

  if (posts) {
    return ( 
      <>
      <h2>Posts</h2>
      { outputPost() }
      </>
    )
  } else {
    return ( 
    <>
      <div>
        nav ieladejies vel pis nahuj
      </div>
    </>  
    )
  }
}

export default posts