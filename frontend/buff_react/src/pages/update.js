import React from "react";
import { Button } from 'react-bootstrap';

export default function Update() {
    console.log("Update page has been called!")

    return (
        <React.Fragment>
        <div id="container">
            <form id="default-form">
                <h1>
                    Want to update your list?
                </h1>

                <label>Enter your ID:</label>
                <input></input>

                <h2>
                    Input changes - 
                </h2>

                <label>Name:</label>
                <input></input>

                <label>Age:</label>
                <input></input>

                <label>Gender:</label>
                <input></input>

                <label>Height:</label>
                <input></input>

                <label>Weight:</label>
                <input></input>

                {/* <Button type="submit" variant ="success">{loading ? "submitting" : "Submit"}</Button> */}
                <Button type="submit">Submit</Button>
            </form>
        </div>
        </React.Fragment>
    );
}