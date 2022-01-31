import {React, useState} from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import "./faqScreen.css"
import pic from "../assets/bilicvitak.svg"

function FAQScreen() {

    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)
    const [q3, setQ3] = useState(false)
    const [q4, setQ4] = useState(false)
    const [q5, setQ5] = useState(false)

    function clickedFirst() {
        if (q1) {
            setQ1(false)    
        } else {
            setQ1(true)    
        }
    }

    function clickedSecond() {
        if (q2) {
            setQ2(false)    
        } else {
            setQ2(true)    
        }
    }

    function clickedThird() {
        if (q3) {
            setQ3(false)    
        } else {
            setQ3(true)    
        }
    }

    function clickedFourth() {
        if (q4) {
            setQ4(false)    
        } else {
            setQ4(true)    
        }
    }

    function clickedFifth() {
        if (q5) {
            setQ5(false)    
        } else {
            setQ5(true)    
        }
    }

    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <br/>
            <h2>FAQ</h2>
            <br/>
            <br/>
            <Row>
            <Col>
            <Card style={{ width: '150vh', "backgroundColor":"black", "color":"white" }}>
                <Card.Body>
                    <Card.Title>What is f v n r l?</Card.Title>
                    <button type="submit" className="btnfaq" onClick={clickedFirst}><i style={{"color":"white"}} class={q1 ? "fas fa-minus" : "fas fa-plus"}></i></button>
                    <Card.Text style={{display: q1 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '150vh', "backgroundColor":"black", "color":"white" }}>
                <Card.Body>
                    <Card.Title>What is our return policy?</Card.Title>
                    <button type="submit" className="btnfaq" onClick={clickedSecond}><i style={{"color":"white"}} class={q2 ? "fas fa-minus" : "fas fa-plus"}></i></button>
                    <Card.Text style={{display: q2 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '150vh', "backgroundColor":"black", "color":"white" }}>
                <Card.Body>
                    <Card.Title>Shipping?</Card.Title>
                    <button type="submit" className="btnfaq" onClick={clickedThird}><i style={{"color":"white"}} class={q3 ? "fas fa-minus" : "fas fa-plus"}></i></button>
                    <Card.Text style={{display: q3 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '150vh', "backgroundColor":"black", "color":"white" }}>
                <Card.Body>
                    <Card.Title>Can't find product?</Card.Title>
                    <button type="submit" className="btnfaq" onClick={clickedFifth}><i style={{"color":"white"}} class={q5 ? "fas fa-minus" : "fas fa-plus"}></i></button>
                    <Card.Text style={{display: q5 ? "" : "none"}} >
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            <Card style={{ width: '150vh', "backgroundColor":"black", "color":"white" }}>
                <Card.Body>
                    <Card.Title>More Questions?</Card.Title>
                    <button type="submit" className="btnfaq" onClick={clickedFourth}><i style={{"color":"white"}} class={q4 ? "fas fa-minus" : "fas fa-plus"}></i></button>
                    <Card.Text style={{display: q4 ? "" : "none"}} >
                        Got more questions? <a className="linkfaq"  style={{"color":"white"}} href="/contact">Contact us!</a>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br/>
            <br/>
            </Col>
            <Col>
                    <img src={pic} alt="" style={{"transform":"rotate(90deg) scaleY(2) scaleX(2)", "marginTop":"25vh"}}/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                    <i class="fas fa-cross" style={{"color":"white", "marginLeft":"9vh"}}></i><br/><br/>
                    <i class="fas fa-cross" style={{"color":"white", "marginLeft":"9vh"}}></i><br/><br/>
                    <i class="fas fa-cross" style={{"color":"white", "marginLeft":"9vh"}}></i><br/>
            </Col>
            </Row>
        </div>
    )
}

export default FAQScreen
