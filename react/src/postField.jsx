import React, { useEffect } from "react";
import { useState } from "react";
import { apiMethod, userExists, getToken, makePost, makeComment} from './util.js'

function posts() {
  const [posts, setPosts] = useState(null)

  function outputPost(){
    const output = new Array()

    posts.forEach(post => {
      const postCard = new Array()
      postCard.push(
        <>
          <span style={{"fontWeight": 'bold', "marginInline": "5px"}}> #{post.id}</span> <span style={{"fontWeight": 'bold'}}>{post.title}</span> posted by <span style={{"fontWeight": 'bold'}}>{post.user.name}</span>
          <p style={{"marginLeft": "15px"}}>
            {post.desc}
          </p>
          <form style={{"padding": "0px 10px 10px 10px"}} onSubmit={(e) => {
            e.preventDefault()
            makeComment(post.id, e.target.comment.value)
          }}>
            <input placeholder="Leave comment" name="comment"/>
            <button>save</button>
          </form>
        </>
      )
  
      Object.entries(post.comments).forEach(comment => {
        postCard.push(
          <div style={{"paddingLeft": "25px", "borderLeft": "2px solid"}}>
            posted by <span style={{"fontWeight": 'bold'}}>{comment[1].user.name}</span>
            <p style={{"paddingLeft": '10px'}}>{comment[1].comment}</p>
          </div>
        )
      })

      output.push(
        <div style={{"paddingLeft": "10px", "borderLeft": "2px solid", "marginTop": "15px"}}>
          {postCard}
        </div>
      )
    })
  
    return (
      <div>
        {output}
      </div>
    )
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
        makePost(e.target.title.value, e.target.desc.value)
      }}>
        <input placeholder="title" name="title"/><br/>
        <input placeholder="Post text" name="desc"/><br/>
        <button>post</button>
      </form>

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