import React, { useState } from "react"
import './css/default.css';
import { Button } from 'react-bootstrap';
import axios from "axios"

export default function Delete () {

    let [id, setid] = useState('');
    
    let [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    let deleteStudent = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        axios.delete('http://127.0.0.1:5000/list/' + id)
        .then(function(response) {
            setError(false);
            setLoading(false);
            setResponse(response);
            console.log(response.data);
        })
        .catch(function(error) {
            setError(true);
            setLoading(false);
            setResponse(error);
            console.dir(error);
        })
    }

    return (
        <React.Fragment>
            <div id="container">
                <form id="default-form">
                    <h1>
                        No longer want your list?
                    </h1>
                    <label htmlFor="id">Delete it:</label>
                    <input type="text" placeholder="Enter ID"></input>

                    {/* <Button type="submit" variant ="success">{loading ? "submitting" : "Submit"}</Button> */}
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </React.Fragment>
    );
}