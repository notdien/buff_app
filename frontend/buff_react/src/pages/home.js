import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
// import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Nav } from "react-bootstrap";

export default function Home() {
    // const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <section id="container">
            <h1>
                Welcome to BUFF!
            </h1>

            <section id="innerBox">
            {/* <>
                <Button variant="success"
                    onClick={() => setOpen(!open)}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    What is BUFF!?
                </Button>
                <Collapse in={open}>
                    <div id="example-collapse-text">
                        BUFF! is a web app created for users to track their PR's in the gym.
                    </div>
                </Collapse>
            </> */}

            <h2 id="buffTitle">
                What is BUFF!?
            </h2>
            <p id="description">
                BUFF! is a web app create for users to track and see their progress with their PR's in the gym.
                I created it as a way for me to track my progress and see how fast I could progress with my gym PRs!
                If you are interested in tracking and seeing your progressing, click that button below to get started!
            </p>

            <Nav.Link id="create-link" as={ Link } to='/create'>
            <Button variant="success" size="lg">
                Get started here!
            </Button>
            </Nav.Link>

            </section>

            </section>
            
        </React.Fragment>
    );
}