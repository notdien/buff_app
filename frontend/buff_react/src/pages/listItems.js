import React from "react"

export default function List() {
    console.log("Listing page has been called!")

    return (
        <React.Fragment>
        <div id="container">
            <form id="default-form">
                <h1>
                    View your information
                </h1>
                <label htmlFor="ID">Enter ID:</label>
                <input type="text" placeholder="Enter ID"></input>
            </form>
        </div>
        </React.Fragment>
    );
}