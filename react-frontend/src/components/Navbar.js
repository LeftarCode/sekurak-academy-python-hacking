import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import SearchPostsForm from "../forms/SearchPostsForm";

function Navbar() {  
    const [error, setError] = useState("");
    const searchPosts = (data) => {
        var json = JSON.parse(data)
        fetch(`http://target.lab:5000/posts_by_title?title=${json.title}`).then(response => {
            console.log(response);
            if (response.status != 200) {
                response.json().then(json => {
                    setError("SQL Error")
                })
            } else {
                setError("")
            }
        });
    };

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink to="/" className={"navbar-brand"}>
                NG-Sekurak
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Dashboard
                    </NavLink>
                </li>
            </ul>
            <SearchPostsForm onSubmit={searchPosts}/>
            {error != "" ? (
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (<></>)}
            </div>
        </div>
    </nav>
    );
  }
  
  export default Navbar;