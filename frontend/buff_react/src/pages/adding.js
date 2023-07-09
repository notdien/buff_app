import React from "react";
import { Button } from 'react-bootstrap';

export default function Add() {
    console.log("Adding page has been called!")

    return (
        <React.Fragment>
            <div id="container">
                <form id="default-form">
                    <h1>
                        Add a new PR
                    </h1>

                    <label>Enter your ID:</label>
                    <input></input>

                    <label>Enter PR name:</label>
                    <input></input>

                    <label>Enter PR:</label>
                    <input></input>

                    {/* <Button type="submit" variant ="success">{loading ? "submitting" : "Submit"}</Button> */}
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </React.Fragment>
    );
}