import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
export default function Brand(){
    return <>
    <Navbar.Brand >
      <img
        src="/icon.jpg"
        width="80"
        height="80"
        className="d-inline-block align-top"
        alt=""
      /><span className="brand">RecipeMe</span>
    </Navbar.Brand>
    </>
}