import React from "react";
import { useState } from "react";
import axios from "axios"
import { Form, FloatingLabel, Button } from 'react-bootstrap';


export default function Create() {

    let [Name, setName] = useState("")
    let [Age, setAge] = useState("")
    let [Gender, setGender] = useState("")
    let [Weight, setWeight] = useState("")
    let [Height, setHeight] = useState("")

    let [response, setResponse] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    function clear() {
        document.getElementById("Name").value = "";
        document.getElementById("Age").value = "";
        document.getElementById("Gender").value = "";
        document.getElementById("Weight").value = "";
        document.getElementById("Height").value = "";
    }

    let createList = (e) => {
        console.log("Pinged createList")
        e.preventDefault();
        console.log(Name, Age, Gender, Weight, Height);

        setError(null);
        setLoading(Name, Age, Gender, Weight, Height);

        axios.post('/create-list', {
            Name: Name,
            Age: Age,
            Gender: Gender,
            Weight: Weight,
            Height: Height
        })
        .then(function (response) {
            // successfully created
            setError(false);
            setLoading(false);
            setResponse(response);
            
            console.log("The response to the front end is ");
            console.dir(response);
            console.log("Response Data: " + response.data)
            clear();
        })
        .catch(function (error) {
            // for errors
            setResponse(error);
            setLoading(false);
            setError(true);
            console.log("Error: " + error);
            clear();
        })
        .then(function () {
            clear();
        })
    }

    return (
        <React.Fragment>
        <h1>
            Let's create a new list!
        </h1>
        <div>
            <form onSubmit={createList}>
                
            <label htmlFor="Name">Name: </label>
            <input type="text" id="Name" name="Name"
                value={Name}
                onChange={(e) => {setName(e.target.value)}}
            ></input>

            <br />

            <label htmlFor="Age">Age: </label>
            <input type="number" id="Age" name="Age"
                value={Age}
                onChange={(e) => {setAge(e.target.value)}}
            ></input>
            
            <br />

            <label htmlFor="Gender">Gender: </label>
            <input type="text" id="Gender" name="Gender"
                value={Gender}
                onChange={(e) => {setGender(e.target.value)}}
            ></input>

            <br />

            <label htmlFor="Weight">Weight: </label>
            <input type="number" id="Weight" name="Weight"
                value={Weight}
                onChange={(e) => {setWeight(e.target.value)}}
            ></input>

            <br />

            <label htmlFor="Height">Height: </label>
            <input type="text" id="Height" name="Height"
                value={Height}
                onChange={(e) => {setHeight(e.target.value)}}
            ></input>

            <br />
            
            <Button type="submit" variant ="success">{loading ? "submitting" : "Submit"}</Button>
            {/* <button type="submit">{loading ? "submitting" : "Submit"}</button> */}
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red', 'fontWeight': 'bold' }}>{response.message}</p>}
            <div><p style={{color: 'green', 'fontWeight': 'bold' }}>{response.data}</p></div>

            </form>
        </div>
        </React.Fragment>
    );
}