import React, {useState, useEffect} from "react"
import { Form, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"
import { ORDER_CREATE_REQUEST } from "../constants/orderConstants"
import "./paymentScreen.css"

function PaymentScreen({ history }) {

const cart = useSelector(state => state.cart)
const { shippingAddress } = cart

if(!shippingAddress) {
    history.push("/shipping")
}

const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;

useEffect(() => {
    if(!userInfo) {
        history.push("/account")
    }
}, [userInfo])

const [paymentMethod, setPaymentMethod] = useState("PayPal")

const dispatch = useDispatch()

const submitHandler = async (e) => {
    e.preventDefault()
    await dispatch({ type: ORDER_CREATE_REQUEST });
    await dispatch(savePaymentMethod(paymentMethod))
    
    history.push("/placeorder")
}

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h2 style={{textAlign:"center", color:"5f021f"}}>Payment</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend" style={{"color":"white"}}>Select Method</Form.Label>
                <Col>

                        <section class="lightPay sectionPay" style={{"color":"white"}}>

                            <label className="labelPay">
                                <input id="Stripe"
                                style={{"color":"white"}} 
                                name="paymentMethod" 
                                value="Stripe" 
                                className="inputPay" 
                                type="radio" 
                                name="light" 
                                onChange={(e) => setPaymentMethod(e.target.value)} checked />
                                <span className="designPay"></span>
                                <span className="textPay">Stripe</span>
                            </label>

                            <label className="labelPay">
                                <input id="PayPal" 
                                name="paymentMethod" 
                                value="PayPal" 
                                className="inputPay" 
                                type="radio" 
                                name="light"
                                onChange={(e) => setPaymentMethod(e.target.value)} checked />
                                <span className="designPay"></span>
                                <span className="textPay">PayPal / Credit Card</span>
                            </label>

                        </section>
                    
                </Col>
                </Form.Group>
                <button className="btn effect01" type="submit" variant="primary">
                    Continue
                </button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen