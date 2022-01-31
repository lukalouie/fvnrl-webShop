import React, {useState, useEffect} from "react"
import { Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { saveShippingAddress } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"
import "./inputs.css"
//logout za vrijeme shippinga na acc stranicu!!

function ShippingScreen({ history }) {

const cart = useSelector(state => state.cart)
if (cart !== null) {
    const { shippingAddress } = cart    
}
const { shippingAddress } = cart 

const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : null)
const [city, setCity] = useState(shippingAddress ? shippingAddress.city : null)
const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : null)
const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : null)

const userLogin = useSelector((state) => state.userLogin);
const { userInfo } = userLogin;

const dispatch = useDispatch()

useEffect(() => {
    if(!userInfo) {
        history.push("/account")
    }
}, [userInfo])

const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    history.push("/payment")
}

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h2>Shipping</h2>
            <br/>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <input type="text" name="address" className="question inputex" id="add" value={address} requiredAutocomplete="off" onChange={(e) => setAddress(e.target.value)} />
                    <label className="labelex textareaex" for="add" style={{"color":"white"}}><span className="spanex">Address?</span></label>
                </Form.Group>
                <Form.Group controlId="city">
                    <input type="text" name="city" className="question inputex" id="cty" value={city} requiredAutocomplete="off" onChange={(e) => setCity(e.target.value)} />
                    <label className="labelex textareaex" for="cty" style={{"color":"white"}}><span className="spanex">City?</span></label>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <input type="text" name="postalCode" className="question inputex" id="pstl" value={postalCode} requiredAutocomplete="off" onChange={(e) => setPostalCode(e.target.value)} />
                    <label className="labelex textareaex" for="pstl" style={{"color":"white"}}><span className="spanex">Postal Code?</span></label>
                </Form.Group>
                <Form.Group controlId="country">
                    <input type="text" name="country" className="question inputex" id="ctry" value={country} requiredAutocomplete="off" onChange={(e) => setCountry(e.target.value)} />
                    <label className="labelex textareaex" for="ctry" style={{"color":"white"}}><span className="spanex">Country?</span></label>
                </Form.Group>
                <button className="btn effect01" type="submit" variant="primary">
                    Continue
                </button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
