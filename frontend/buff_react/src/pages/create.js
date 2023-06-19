import React from "react";
import { useState } from "react";
import axios from "axios"
import { Form, FloatingLabel } from 'react-bootstrap'


export default function Create() {

    let [Name, setName] = useState("")
    let [Age, setAge] = useState("")
    let [Gender, setGender] = useState("")
    let [Weight, setWeight] = useState("")
    let [Height, setHeight] = useState("")

    let [response, setResponse] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    return (
        <React.Fragment>
        <h1>
            Let's create a new list!
        </h1>

        <>
            <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
            >
                <Form.Control type="name" placeholder="John Doe" />
            </FloatingLabel>
            <FloatingLabel controlId="age" label="Age">
                <Form.Control type="age" placeholder="Age" />
            </FloatingLabel>
        </>

        </React.Fragment>
    );
}