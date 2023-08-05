import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";
import './display.css';

export default function Prs() {
    console.log("PRs page has been called!")

    let [id, setid] = useState('')
    let [loading , setLoading] = useState(true);
    let [data, setData] = useState(null);
    let [error, setError] = useState(null);

    let getPrs = (e) => {
        e.preventDefault();
        setError(null);

        axios.get('http://127.0.0.1:5000/list/lifts/' + id, {

        })

        .then(function (response) {
            setError(false);
            setLoading(false);
            setData(response.data);
            console.dir(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function () {

        })
    }

    return (
        <React.Fragment>
            <div id="container">
                <form onSubmit={getPrs} id="default-form">
                    <h1>
                        View your PRs
                    </h1>
                    <label htmlFor="id">Enter your ID:</label>
                    <input required id = 'id' name = 'id' value = {id}
                    onChange={(e) => {setid(e.target.value)}} placeholder="Enter ID"
                    ></input>

                    <Button type="submit">{loading ? "submitting" : "Submit"}</Button>

                    {loading && <p>Loading Prs...</p>}
                    {error && <p style={{color: 'red' }}>Error: {error}</p>}
                    {data && (!data.length || data.length === 0) && <p>No results founnd!</p>}
                    {data && data.length > 0 && <>
                    {data.map((user) => (
                        <div key = {user.Id}>
                            <h2>{user.Name}</h2>
                            <ul>
                                {user.Lifts.map((lift) => (
                                    <li key={lift.Date}>
                                        <p>Date: {lift.Date}</p>
                                        <p>Lift: {lift.Lift}</p>
                                        <p>PR: {lift.Pr}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </>}
                </form>
            </div>
        </React.Fragment>
    );
}