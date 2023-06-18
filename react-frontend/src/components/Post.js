import { NavLink } from "react-router-dom";

function Post(post) {  
    console.log(post)
    return (
        <div className="card col-3 mx-2 my-2">
            <img src="https://sekurak.pl/wp-content/uploads/2023/05/cir123-150x150.jpeg" className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <NavLink to={"/post/" + post.id} className={"btn btn-primary"}>
                    Read more
                </NavLink>
            </div>
        </div>
    );
}
  
export default Post;