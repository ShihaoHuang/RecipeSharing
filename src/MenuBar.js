import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
  } from "react-router-dom";
  
export default function MenuBar(){

    return <>
            
          <NavLink to="/home" activeStyle={{fontWeight: "bold", color: "rgb(146, 101, 4)"}}className="col-8 nav-bar">Home</NavLink>
          <NavLink to="/search" activeStyle={{fontWeight: "bold", color: "rgb(146, 101, 4)"}} className="col-8 nav-bar">Search</NavLink>
          <NavLink to="/create" activeStyle={{fontWeight: "bold", color: "rgb(146, 101, 4)"}} className="col-8 nav-bar">Share Your Recipe</NavLink>
         
    </>
}