import React, { useEffect } from "react";
import { useState } from "react";
import { apiMethod, userExists, getToken, makePost, makeComment } from './util.js'

function posts() {
  const [posts, setPosts] = useState(null)

  function outputPost(){
    const output = new Array()

    posts.forEach(post => {
      output.push(
        <>
          <span style={{"fontWeight": 'bold', "marginInline": "5px"}}> #{post.id}</span> <span style={{"fontWeight": 'bold'}}>{post.title}</span> posted by <span style={{"fontWeight": 'bold'}}>{post.user.name}</span>
          <p style={{"marginLeft": "15px"}}>
            {post.desc}
          </p>
        </>
      )
  
      Object.entries(post.comments).forEach(comment => {
        output.push(
          <div style={{"paddingLeft": "25px", "borderLeft": "2px solid"}}>
            posted by <span style={{"fontWeight": 'bold'}}>{comment[1].user.name}</span>
            <p style={{"paddingLeft": '10px'}}>{comment[1].comment}</p>
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
      <form style={{"paddingBottom": "10px"}} onSubmit={(e) => {
        e.preventDefault()
        makePost(e.target.title.value, e.target.text.value)
      }}>
        <input placeholder="title" name="title"/><br/>
        <input placeholder="Post text" name="text"/><br/>
        <button>post</button>
      </form>


      <div style={{"paddingLeft": "10px", "borderLeft": "2px solid"}}>
        { outputPost() }
      </div>
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