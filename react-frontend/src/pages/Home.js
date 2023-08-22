import Navbar from '../components/Navbar'
import Post from '../components/Post'
import React, { useEffect, useState } from 'react';

function Home() {  
    const [posts, setPosts] = useState([]);
  
    useEffect(() => {
     let mounted = true;
     fetch("http://target.lab:5000/posts")
     .then(response => response.json())
     .then(response => setPosts(response.posts))
     return () => mounted = false;
   }, [])

   console.log(posts)
    return (
    <div className='container-fluid'>
        <Navbar/>
        <div className='container-fluid'>
            <div className='row'>
                {posts.map(post => <Post id={post.id} title={post.title} content={post.content}/>)}
            </div>
        </div>
    </div>
    );
}
  
export default Home;