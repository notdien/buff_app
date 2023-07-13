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
                <form id="default-form" onSubmit={deleteStudent}>
                    <h1>
                        No longer want your list?
                    </h1>
                    <label htmlFor="id">Delete it:</label>
                    <input required type="text" placeholder="Enter ID"
                    id = "id" name="id" value={id}
                    onChange={(e) => {setid(e.target.value)}}
                    ></input>

                    <Button type="submit">{loading ? "submitting" : "Submit"}</Button>
                    {loading && <p>Loading...</p>}
                    {/* {error && <p style={{color: 'red', 'fontWeight': 'bold' }}>{response.message}</p>}
                    <div><p style={{color: 'green', 'fontWeight': 'bold' }}>{response.data}</p></div> */}
                </form>
            </div>
        </React.Fragment>
    );
}