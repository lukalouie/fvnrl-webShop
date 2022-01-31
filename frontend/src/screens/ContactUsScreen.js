import React from "react"
import { Card } from "react-bootstrap"
import contact from "../assets/contact.jpg"
import "./aboutUsScreen.css"
 //sorry for the <br>s
function ContactUsScreen() {
    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <br/>
            <h2>CONTACT US</h2>

            <br/>
            <br/>

            <Card className="bg-dark text-white">
                <Card.Img src={contact} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title style={{textAlign:"center"}}>HOW?</Card.Title>
                    <br/>
                <Card.Text style={{textAlign: "center", fontSize:"1.2rem"}}>
                    Guess you have some more questions? <br/>
                         
                    You can always contact us directly via: <br/>
                    <br/>
                    Email: <a className="link1" href="mailto:95.luka@gmail.com" target="_blank"><strong>95.luka@gmail.com</strong><br/></a>
                    Phone: <strong>00 385 98 964-4766</strong><br/>
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
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <strong>Be sure to call us from your burner phone!</strong><br/>
                         
                </Card.Text>
            </Card.ImgOverlay>
            </Card>

            <br/>
            <br/>
        </div>
    )
}

export default ContactUsScreen