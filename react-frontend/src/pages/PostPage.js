import Navbar from '../components/Navbar'
import Post from '../components/Post'
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function PostPage() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    let { id } = useParams();
  
    useEffect(() => {
        let mounted = true;
        fetch("http://target.lab:5000/post?id="+id)
        .then(response => response.json())
        .then(response => {
            setPost(response.post);
            setLoading(false);
        })
        return () => mounted = false;
    }, []);

    return (
    <div className='container-fluid'>
        <Navbar/>
        <div className="row">
            <div className='offset-3 col-6'>
                {loading && (
                    <div className="spinner-border" role="status"></div>
                )}
                {!loading && (
                    <>
                        <h1>{post.title}</h1>
                        <div className="post-content">
                            <p>
                                {post.content}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
    );
}
  
export default PostPage;