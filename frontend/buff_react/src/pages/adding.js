import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";

export default function Add() {

    let [id, setid] = useState('')
    let [Lift, setLift] = useState('')
    let [Pr, setPr] = useState('')
    let [Date, setDate] = useState('')

    let [response, setResponse] = useState('')
    const [error, setError] = useState('')
    const [loading , setLoading] = useState('')

    let addPrs = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(Lift, Pr, Date);

        axios.post('http://127.0.0.1:5000/list/' + id, {
            Lift: Lift,
            Pr: Pr,
            Date: Date
        })
        .then(function(response){
            setError(false);
            setLoading(false);
            setResponse(response);
            console.log(response.data);
        })
        .catch(function(error){
            setError(true);
            setLoading(false);
            setResponse(error);
            console.dir(error);
        })
    }
     

    return (
        <React.Fragment>
            <div id="container">
                <form onSubmit={addPrs} id="default-form">
                    <h1>
                        Add a new PR
                    </h1>

                    <label htmlFor="id">Enter your ID:</label>
                    <input required id = 'id' name = 'id' value = {id}
                    onChange={(e) => {setid(e.target.value)}}
                    ></input>

                    <label htmlFor="Lift">Enter PR name:</label>
                    <input required id='Lift' name='Lift' value={Lift}
                    onChange={(e) => (setLift(e.target.value))}
                    ></input>

                    <label htmlFor="Pr">Enter PR:</label>
                    <input required id='Pr' name='Pr' value={Pr}
                    onChange={(e) => (setPr(e.target.value))} type="number"
                    ></input>

                    <label htmlFor="Date">Enter Date:</label>
                    <input required id='Date' name='Date' value={Date}
                    onChange={(e) => (setDate(e.target.value))}
                    ></input>

                    <Button type="submit">{loading ? "submitting" : "Submit"}</Button>
                    {/* {error && <p style={{color: 'red', 'fontWeight': 'bold' }}>{response.message}</p>}
                    <div><p style={{color: 'green', 'fontWeight': 'bold' }}>{response.data}</p></div> */}
                </form>
            </div>
        </React.Fragment>
    );
}