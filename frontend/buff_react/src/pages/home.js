import './css/home.css'
import React from "react";

import Create from './create';
import Adding from './adding';

export default function Home() {
    return (
        <React.Fragment>
            <section id="container">
            <h1>
                Welcome to BUFF!
            </h1>

            <p>
                Insert Image here
            </p>

            <h2>
                New Here?
            </h2>
            <p>
                Insert Link to create page
            </p>

            <h2>
                Already have a list?
            </h2>
            <p>
                Insert link to add to a list
            </p>
            </section>
        </React.Fragment>
    );
}