import Navbar from '../components/Navbar'
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function AddSupportTicket({onSubmit}) {
    const [error, setError] = useState("");
    const {register, handleSubmit} = useForm();

    return (
        <div className="row">
            <form id="add-support-form" className='col-12' onSubmit={handleSubmit((data) => onSubmit(JSON.stringify(data)))}>
                {error != "" ? (
                    <div class="alert alert-danger" role="alert">
                        {error}
                    </div>
                ) : (<></>)}
                
                <div className="mb-3">
                    <label htmlFor="problem" className="form-label">Problem</label>
                    <input {...register("problem", {"required": true})} type="text" className="form-control" id="problem"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea {...register("description", {"required": true})} className="form-control" id="description"/>
                </div>
                <button type="submit" className="btn btn-success">Next</button>
            </form>
        </div>
    );
}
  
export default AddSupportTicket;