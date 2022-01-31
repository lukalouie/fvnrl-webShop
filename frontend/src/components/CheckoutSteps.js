import React from 'react'
import { Nav } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

function CheckoutSteps({ step1, step2, step3, step4 }) {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to="/login" style={{"color":"white"}}>
                        <Nav.Link style={{"color":"white"}}>Sign In</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Sign In</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to="/shipping" style={{"color":"white"}}>
                        <Nav.Link style={{"color":"white"}}>Shipping</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled style={{"color":"smoke white"}}>Shipping</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to="/payment" style={{"color":"white"}}>
                        <Nav.Link style={{"color":"white"}}>Payment</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Payment</Nav.Link>}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to="/placeorder" style={{"color":"white"}}>
                        <Nav.Link style={{"color":"white"}}>Place Order</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled style={{"color":"smoke white"}}>Place Order</Nav.Link>}
            </Nav.Item>

        </Nav>
    )
}

export default CheckoutSteps
