import Navbar from '../components/Navbar'
import Post from '../components/Post'
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import AddPostForm from '../forms/AddPostForm';
import AddSupportTicket from '../forms/AddSupportTicket';

function Dashboard() {
    const [isLogged, setIsLogged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const addPost = (data) => {
        let jwt = window.localStorage.getItem("auth_token");

        fetch("http://localhost:5000/post", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: data
        }).then(response => {
            response.json().then(json => {
                window.location.reload();
            })
        });
    };

    const createSupportTicket = (data) => {
        let jwt = window.localStorage.getItem("auth_token");

        fetch("http://localhost:5000/support", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + jwt
            },
            body: data
        }).then(response => {
            if (response.status == 200) {
                response.json().then(json => {
                    window.localStorage.setItem('sup_con', JSON.stringify(json));
                    window.location.href = "/support";
                })
            }
        });
    };
    
    useEffect(() => {
        let mounted = true;
        return () => mounted = false;
    }, [])
  
    useEffect(() => {
        let mounted = true;

        let jwt = window.localStorage.getItem("auth_token");
        if (jwt == undefined || jwt == "") {
            window.location.href = "/login";
        }

        fetch("http://localhost:5000/me", {
            headers: {
                "Authorization": "Bearer " + jwt
            }
        })
        .then(response => {
            if (response.status != 200) {
                window.location.href = "/login";
            }
            return response.json()
        })
        .then(response => {
            setUser(response);
            setIsLogged(true);
            

            fetch("http://localhost:5000/posts?username="+response.username)
            .then(response => response.json())
            .then(response => {
                setPosts(response.posts);
                setLoading(false);
            })
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
                        <h1 className='mt-4'>Twoje posty</h1>
                        <div className='container-fluid'>
                            <div className='row'>
                                {posts.map(post => <Post id={post.id} title={post.title} content={post.content}/>)}
                            </div>
                        </div>
                        <h1 className='mt-4'>Dodaj post</h1>
                        <div className='container-fluid'>
                            <div className='row'>
                                <AddPostForm onSubmit={addPost}/>
                            </div>
                        </div>
                        {user.role == "admin" && (
                            <>
                                <h1 className='mt-4'>Zgłoś problem do zewnętrznego supportu</h1>
                                <div className='container-fluid'>
                                    <div className='row'>
                                        <AddSupportTicket onSubmit={createSupportTicket}/>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    </div>
    );
}
  
export default Dashboard;