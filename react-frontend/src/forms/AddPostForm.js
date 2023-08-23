import Navbar from '../components/Navbar'
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function AddPostForm({onSubmit}) {
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    return (
        <div className="row">
            <form id="add-post-form" className='col-12' onSubmit={handleSubmit((data) => onSubmit(JSON.stringify(data)))}>
                {error != "" ? (
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : (<></>)}
                
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input {...register("title", {"required": true})} type="text" className="form-control" id="title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea {...register("content", {"required": true})} className="form-control" id="content"/>
                </div>
                <button type="submit" className="btn btn-success">Create</button>
            </form>
        </div>
    );
}
  
export default AddPostForm;