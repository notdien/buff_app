import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/home.css';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Nav, Collapse } from "react-bootstrap";

export default function Home() {
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <section id="container">
            <h1>
                Welcome to BUFF!
            </h1>

            <>
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
            </>

            <h2>
                New Here?
            </h2>
            <Nav.Link as={ Link } to='/create'>
            <Button variant="success" size="lg">
                Get started here!
            </Button>
            </Nav.Link>

            <h2>
                Already have a list?
            </h2>
            <Nav.Link as ={ Link } to='/adding'>
            <Button variant="success" size="lg">
                Add to your PR list!
            </Button>
            </Nav.Link>
            </section>
            
        </React.Fragment>
    );
}