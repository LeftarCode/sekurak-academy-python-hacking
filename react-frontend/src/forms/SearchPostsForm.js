import Navbar from '../components/Navbar'
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function SearchPostsForm({onSubmit}) {
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    return (
        <form id="search-form" className="d-flex" onSubmit={handleSubmit((data) => onSubmit(JSON.stringify(data)))}>
            <input {...register("title", {"required": true})} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
    );
}
  
export default SearchPostsForm;