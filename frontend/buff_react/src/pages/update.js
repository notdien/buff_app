import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios"

export default function Update() {
    
    let [id, setid] = useState('');
    let [Name, setName] = useState('');
    let [Age, setAge] = useState('');
    let [Gender, setGender] = useState('');
    let [Height, setHeight] = useState('');
    let [Weight, setWeight] = useState('');

    let [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    let updateStudent = (e) => {
        e.preventDefault();
        setError(null)
        setLoading(Name, Age, Gender, Height, Weight);

        axios.put('http://127.0.0.1:5000/list/' + id, {
            Name: Name,
            Age: Age,
            Gender: Gender,
            Height: Height,
            Weight: Weight
        })
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
            <form onSubmit={updateStudent} id="default-form">
                <h1>
                    Want to update your list?
                </h1>

                <label htmlFor="id">Enter your ID:</label>
                <input required id = 'id' name = 'id' value = {id}
                onChange={(e) => {setid(e.target.value)}}
                ></input>

                <h2>
                    Input changes - 
                </h2>

                <label htmlFor="Name">Name:</label>
                <input required id='Name' name='Name' value = {Name}
                onChange={(e) => {setName(e.target.value)}}
                ></input>

                <label htmlFor="Age">Age:</label>
                <input required id='Age' name='Age' value = {Age}
                onChange={(e) => {setAge(e.target.value)}} type="number"
                ></input>

                <label htmlFor="Gender">Gender:</label>
                <input required id='Gender' name='Gender' value = {Gender}
                onChange={(e) => {setGender(e.target.value)}}
                ></input>

                <label htmlFor="Height">Height:</label>
                <input required id='Height' name='Height' value = {Height}
                onChange={(e) => {setHeight(e.target.value)}}
                ></input>

                <label htmlFor="Weight">Weight:</label>
                <input required id='Weight' name='Weight' value = {Weight}
                onChange={(e) => {setWeight(e.target.value)}} type="number"
                ></input>

                <Button type="submit" variant ="success">{loading ? "submitting" : "Submit"}</Button>
                {loading && <p>Loading...</p>}
                {/* {error && <p style={{color: 'red', 'fontWeight': 'bold' }}>{response.message}</p>}
                <div><p style={{color: 'green', 'fontWeight': 'bold' }}>{response.data}</p></div> */}
            </form>
        </div>
        </React.Fragment>
    );
}