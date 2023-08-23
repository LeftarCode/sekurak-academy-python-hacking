import Navbar from '../components/Navbar'
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function Login() {
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    const sendLoginRequest = (data) => {
        fetch("http://target.lab:5000/login", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(response => {
            if (response.status != 200) {
                response.json().then(json => {
                    setError(json.error)
                })
            } else {
                response.json().then(json => {
                    window.localStorage.setItem("auth_token", json.access_token);
                    window.location.href="/#/dashboard";
                })
            }
        });
    };

    return (
    <div className='container-fluid'>
        <Navbar/>
        <div className="row">
            <form id="login-form" className='offset-4 col-4' onSubmit={handleSubmit((data) => sendLoginRequest(JSON.stringify(data)))}>
                {error != "" ? (
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : (<></>)}
                
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input {...register("username", {"required": true})} type="text" className="form-control" id="username"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input {...register("password", {"required": true})} type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </div>
    );
}
  
export default Login;