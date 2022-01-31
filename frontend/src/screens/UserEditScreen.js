import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { Form, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { getUserDetails, adminUpdateUser } from "../actions/userActions"
import { USER_ADMIN_UPDATE_RESET } from "../constants/userConstants"

function UserEditScreen({ match, history }) {

    const userId = match.params.id

    const [backText, setBackText] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    function handleClicked() {
        setBackText(true)
    }
    
    function handleOut() {
        setBackText(false)
    }
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userAdminUpdate = useSelector(state => state.userAdminUpdate)
    const {loading:loadingAdminUpdate, error:errorAdminUpdate, success:successAdminUpdate} = userAdminUpdate

   
    useEffect(() => {
        if (successAdminUpdate) {
            dispatch({ type: USER_ADMIN_UPDATE_RESET})
            history.push("/admin/userlist")
        } else {
            if(!user.name || user._id!==userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [history, user, dispatch, userId, successAdminUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdateUser({ _id: userId, name, email, isAdmin }))
        
    }


    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <Link to="/admin/userlist" className="fill my-3" style={{textDecoration: backText ? "line-through" : "none", "color":"white", "borderColor":"white" }} onMouseOver={handleClicked} onMouseOut={handleOut}>
                BVCK
            </Link>
            <FormContainer>
        <h2 style={{textAlign:"center", color:"white"}}>Edit User</h2>
        <br/>
        {loadingAdminUpdate && <Loader />}
        {errorAdminUpdate && <Message variant="danger">{errorAdminUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <input type="text" name="name" className="question inputex" id="nme" value={name} requiredAutocomplete="off" onChange={(e) => setName(e.target.value)} />
                <label className="labelex textareaex" for="nme" style={{"color":"white"}}><span className="spanex">Name?</span></label>
            </Form.Group>

            <Form.Group controlId="email">
                <input type="email" name="email" className="question inputex" id="ml" value={email} requiredAutocomplete="off" onChange={(e) => setEmail(e.target.value)} />
                <label className="labelex textareaex" for="ml" style={{"color":"white"}}><span className="spanex">Email Address?</span></label>
            </Form.Group>

            <Form.Group controlId="isadmin">
                <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button type="submit" className="btn effect01">
                Update
            </Button>

        </Form>
        )}
        
            
        </FormContainer>
        </div>
        
    )
}

export default UserEditScreen
