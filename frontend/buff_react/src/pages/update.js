import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios"

export default function Update() {
    
    let [id, setid] = useState('');
    let [name, setName] = useState('');
    let [age, setAge] = useState('');
    let [gender, setGender] = useState('');
    let [height, setHeight] = useState('');
    let [weight, setWeight] = useState('');

    let [response, setResponse] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    let updateStudent = (e) => {
        e.preventDefault();
        setError(null)
        setLoading(name, age, gender, height, weight);

        axios.put('http://127.0.0.1:5000/list/' + id, {
            name: name,
            age: age,
            gender: gender,
            height: height,
            weight: weight
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

                <label htmlFor="name">Name:</label>
                <input required id='name' name='name' value = {name}
                onChange={(e) => {setName(e.target.value)}}
                ></input>

                <label htmlFor="age">Age:</label>
                <input required id='age' name='age' value = {age}
                onChange={(e) => {setAge(e.target.value)}}
                ></input>

                <label htmlFor="gender">Gender:</label>
                <input required id='gender' name='gender' value = {gender}
                onChange={(e) => {setGender(e.target.value)}}
                ></input>

                <label htmlFor="height">Height:</label>
                <input required id='height' name='height' value = {height}
                onChange={(e) => {setHeight(e.target.value)}}
                ></input>

                <label htmlFor="weight">Weight:</label>
                <input required id='weight' name='weight' value = {weight}
                onChange={(e) => {setWeight(e.target.value)}}
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