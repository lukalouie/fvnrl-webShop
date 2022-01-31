import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { register } from "../actions/userActions"
import "./inputs.css"

function RegisterScreen({ location, history }) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmedPass, setConfirmedPass] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    const redirect = location.search ? location.search.split("=")[1] : "/account"

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmedPass) {
            setMessage("Passwords do not match")
        } else {
            dispatch(register(name, email, password))
        }
    }


    return (
        <FormContainer>
        <h2 style={{textAlign:"center", color:"white"}}>Join us</h2>
        <br />
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <input type="text" name="name" className="question inputex" id="nme" value={name} requiredAutocomplete="off" onChange={(e) => setName(e.target.value)} />
                <label className="labelex textareax" for="nme" style={{"color":"white"}}><span className="spanex">Name?</span></label>
            </Form.Group>

            <Form.Group controlId="email">
                <input type="email" name="email" className="question inputex" id="ml" value={email} requiredAutocomplete="off" onChange={(e) => setEmail(e.target.value)} />
                <label className="labelex textareax" for="ml" style={{"color":"white"}}><span className="spanex">Email Address?</span></label>
            </Form.Group>

            <Form.Group controlId="password">
                <input className="question inputex" style={{"backgroundColor":"transparent"}} type="password" name="password" id="pswrd" value={password} requiredAutocomplete="off" onChange={(e) => setPassword(e.target.value)} />
                <label className="labelex textareax" for="pswrd" style={{"color":"white"}}><span className="spanex">Password?</span></label>
            </Form.Group>

            <Form.Group controlId="confirmedPass">
                <input className="question inputex" type="password" name="confirmedPass" id="pswrdcnf" value={confirmedPass} requiredAutocomplete="off" onChange={(e) => setConfirmedPass(e.target.value)} />
                <label className="labelex textareax" for="pswrdcnf" style={{"color":"white"}}><span className="spanex">Confirm password!</span></label>
            </Form.Group>

            <Button type="submit" className="btn effect01">
                JOIN
            </Button>

        </Form>

            <Row className="py-3">
                <Col style={{"color":"white"}}>
                    Already have an account?         
                    <Link to={redirect ? `login/redirect=${redirect}` : "/login"} style={{"color":"white", "margin-left":"1rem"}}>
                        Sign in
                    </Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default RegisterScreen