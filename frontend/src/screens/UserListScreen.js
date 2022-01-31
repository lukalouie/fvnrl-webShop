import React, { useEffect} from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { listUsers, deleteUser } from "../actions/userActions"

function UserListScreen({history}) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const {success: successDelete} = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())    
        } else {
            history.push("/account")
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteUser(id))    
        }
    }

    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
        <h2>Users</h2>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        : (
            <Table style={{color:"white", "padding":"0", "margin":"0"}} striped bordered hover responsive className="table-bordered">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            NAME
                        </th>
                        <th>
                            EMAIL
                        </th>
                        <th>
                            ADMIN
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td style={{color:"white"}}>{user._id}</td>
                            <td style={{color:"white"}}>{user.name}</td>
                            <td style={{color:"white"}}><a style={{color:"white"}} href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td style={{color:"white"}}>
                                {user.isAdmin ? (<i className="fas fa-check" style={{color:"green"}}></i>) : 
                                (
                                    <i className="fas fa-times" style={{color:"red"}}></i>
                                )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                    <Button variant="light" className="simpleButton">
                                        <i className="fas fa-edit"></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant="light" className="simpleButton" onClick={() =>
                                deleteHandler(user._id)}>
                                    <i className="fas fa-solid fa-skull-crossbones"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </div>
    )
}

export default UserListScreen