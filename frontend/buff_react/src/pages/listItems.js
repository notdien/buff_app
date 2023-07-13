import React, { useEffect, useState } from "react"
import { Button } from 'react-bootstrap';
import axios from "axios";
import './display.css';

export default function List() {
    let [id, setid] = useState('')


    let [data, setData] = useState('')
    let [response, setResponse] = useState('')
    const [loading, setLoading] = useState('')
    const [error, setError] = useState('')

    function listItems() {
        axios.get('http://127.0.0.1:5000/list/' + id)
        .then(function (response){
            setError(false);
            setLoading(false);
            setData(response.data)
            console.dir(response.data);
        })
        .catch(function(error) {
            console.log(error);
        }) 
    }

    return (
        <React.Fragment>
        <div id="container">
            <form onSubmit={listItems} id="default-form">
                <h1>
                    View your information
                </h1>
                <label htmlFor="ID">Enter ID:</label>
                <input required type="text" placeholder="Enter ID"
                id='id' name='id' value={id}
                onChange={(e) => setid(e.target.value)}
                ></input>

                <Button type="submit">{loading ? "submitting" : "Submit"}</Button>
            </form>
        </div>
        </React.Fragment>
    );
}