import Navbar from '../components/Navbar'
import Post from '../components/Post'
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import AddPostForm from '../forms/AddPostForm';
import AddSupportTicket from '../forms/AddSupportTicket';

function SupportConfirmation() {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const supportConfirmation = JSON.parse(window.localStorage.getItem("sup_con"))["confirmation"];

    const confirmTicket = (data) => {
        let jwt = window.localStorage.getItem("auth_token");

        fetch("http://localhost:5000/support/confirm", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: data
        }).then(response => {
            if (response.status == 200) {
                window.location.href = "/#/dashboard";
            }
        });
    };
  
    useEffect(() => {
        let mounted = true;

        let jwt = window.localStorage.getItem("auth_token");
        if (jwt == undefined || jwt == "") {
            window.location.href = "/#/login";
        }

        fetch("http://localhost:5000/me", {
            headers: {
                "Authorization": "Bearer " + jwt
            }
        })
        .then(response => {
            if (response.status != 200) {
                window.location.href = "/#/login";
            }
            return response.json()
        })
        .then(response => {
            setUser(response);
            setIsLogged(true);
            setLoading(false);
        })
        return () => mounted = false;
    }, []);

    
    return (
    <div className='container-fluid'>
        <Navbar/>
        <div className="row my-5">
            <div className='offset-3 col-6'>
                {loading && (
                    <div className="spinner-border" role="status"></div>
                )}
                {!loading && (
                    <>
                        <p>Welcome {user.username}!</p>
                        <h1 className='mt-4'>Twoje zgłoszenie</h1>
                        <code>
                            {supportConfirmation}
                        </code>
                    </>
                )}
            </div>
        </div>
    </div>
    );
}
  
export default SupportConfirmation;