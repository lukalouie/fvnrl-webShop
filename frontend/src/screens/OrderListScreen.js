import React, { useEffect } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { adminListOrders } from "../actions/orderActions"

function OrderListScreen({history}) {

    const dispatch = useDispatch()

    const adminOrderList = useSelector(state => state.adminOrderList)
    const {loading, error, orders} = adminOrderList

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(adminListOrders())    
        } else {
            history.push("/account")
        }
    }, [dispatch, history, userInfo])


    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
        <h2>Orders</h2>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message>
        : (
            <Table striped bordered hover responsive className="table-bordered" style={{"color":"white"}}>
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            NAME
                        </th>
                        <th>
                            TOTAL PRICE
                        </th>
                        <th>
                            PAID
                        </th>
                        <th>
                            ADDRESS
                        </th>
                        <th>
                            DELIVERED
                        </th>
                        <th>
                            DETAILS
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td style={{"color":"white"}}>{order._id}</td>
                            <td style={{"color":"white"}}>{order.user && order.user.name}</td>
                            <td style={{"color":"white"}}>€{order.totalPrice}</td>
                            <td style={{"color":"white"}}>{order.isPaid ? (
                                order.paidAt.substring(0, 10)

                                ) : (
                                    <i className="fas fa-times" style={{color:"red"}}></i>
                                )
                            }</td>
                            <td style={{"color":"white"}}>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </td>
                            <td style={{"color":"white"}}>{order.isDelivered ? (
                                order.deliveredAt.substring(0, 10)

                                ) : (
                                    <i className="fas fa-times" style={{color:"red"}}></i>
                                )
                            }</td>
                            <td>
                                <LinkContainer to={`/order/${order._id}`}>
                                    <Button variant="light" className="simpleButton">
                                        Details
                                </Button>
                                </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
        </div>
    )
}

export default OrderListScreen