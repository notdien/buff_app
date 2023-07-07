import React from "react"
import './css/default.css';

export default function Delete () {
    console.log("Delete page has been called!")

    return (
        <React.Fragment>
            <div id="container">
                <form id="default-form">
                    <h1>
                        No longer want your list?
                    </h1>
                    <label htmlFor="ID">Delete it:</label>
                    <input type="text" placeholder="Enter ID"></input>
                </form>
            </div>
        </React.Fragment>
    );
}