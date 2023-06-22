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
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("weight").value = "";
        document.getElementById("height").value = "";
    }

    let createList = (e) => {
        e.preventDefault();
        console.log(Name, Age, Gender, Weight, Height);

        setError(null);
        setLoading(Name, Age, Gender, Weight, Height);

        axios.post('http://127.0.0.1:5000/create-list', {
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
            <form>
                
            <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
                id="name"
            >
                <Form.Control type="name" placeholder="John Doe" />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingInput"
                label="Age"
                className="mb-3"
                id="age"
            >
                <Form.Control type="age" placeholder="Age" />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingInput"
                label="Gender"
                className="mb-3"
                id="gender"
            >
                <Form.Control type="gender" placeholder="Gender" />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingInput"
                label="Weight"
                className="mb-3"
                id="weight"
            >
                <Form.Control type="weight" placeholder="Weight" />
            </FloatingLabel>

            <FloatingLabel
                controlId="floatingInput"
                label="Height"
                className="mb-3"
                id="height"
            >
                <Form.Control type="height" placeholder="Height" />
            </FloatingLabel>

            <Button variant="success">Submit</Button>{' '}

            </form>
        </div>

        </React.Fragment>
    );
}