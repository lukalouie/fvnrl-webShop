import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { login } from "../actions/userActions"
import "./inputs.css"

function LoginScreen({ location, history }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {loading, error, userInfo} = userLogin

    const redirect = location.search ? location.search.split("=")[1] : "/account"

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
        <h2 style={{textAlign:"center", color:"white"}}>Sign in</h2>
        <br/>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
                <input type="email" name="email" className="question inputex" id="ml" value={email} requiredAutocomplete="off" onChange={(e) => setEmail(e.target.value)} style={{"placeholder": {"color":"white"}, "color":"white"}} />
                <label className="labelex textareax" for="ml" style={{"color":"white"}}><span className="spanex">Email Address?</span></label>
            </Form.Group>

            <Form.Group controlId="password" style={{"color":"white"}}>
                <input className="question inputex" style={{"backgroundColor":"transparent", "color":"white"}} type="password" name="password" id="pswrd" value={password} requiredAutocomplete="off" onChange={(e) => setPassword(e.target.value)} />
                <label className="labelex textareax" for="pswrd" style={{"color":"white"}}><span className="spanex">Password?</span></label>
            </Form.Group>

            <Button type="submit" className="btn effect01">
                SIGN IN
            </Button>

        </Form>

            <Row className="py-3">
                <Col style={{"color":"white"}}>
                    New? 
                    <Link to={redirect ? `register/redirect=${redirect}` : "/register"} style={{"color":"white"}}>
                        Create account!
                    </Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default LoginScreen
