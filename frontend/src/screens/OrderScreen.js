import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants';
import { cartPaid } from '../actions/cartActions';

function OrderScreen({ match, history }) {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  console.log('🐐',orderId, orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading:loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading && order) {
    order.itemsPrice = order.orderItems.reduce((acc, { price }) => acc + price, 0);
    order.shippingPrice = order.itemsPrice > 100 ? 25 : 0;
    order.totalPrice = order.itemsPrice + order.shippingPrice;
    console.log(order.items)
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      console.log('⛳ PayPal script loaded');
      setScriptReady(true);
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;

      script.onload = () => setSdkReady(true);

      document.body.appendChild(script);
    };

    if (!scriptReady) {
      addPayPalScript();
    }
  });

  useEffect(() => {
    if (!userInfo) {
      history.push("/account")
    }
  }, [userInfo, history]) //trebam resetat cart nakon sto se netko logouto -- radi na refresh, probaj dispatchat jos nes.. kao cart... NE OVDJE - uploadaj bazu na temelju promjene countAndSize
  
  useEffect(() => {
    dispatch({ type: ORDER_PAY_RESET });
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (successPay) {
      console.log('? Success payment');
      dispatch({ type: ORDER_PAY_RESET });
    }
  }, [dispatch, successPay]);

  useEffect(() => {
    if(successDeliver) {
      console.log("? success deliver")
      dispatch({type: ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, successDeliver]);

  const successPaymentHandler = async (paymentResult) => {
    await dispatch(payOrder(orderId, paymentResult));
    await dispatch(getOrderDetails(orderId));
    dispatch(cartPaid())
  };

  const deliverHandler = () => {
    console.log("delivered")
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
      <h2 style={{color:"white"}}>Order: {order._id}</h2>
      <br />
      <br />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item style={{"backgroundColor":"black", "color":"white", "textAlign":"center"}}>
              <h2>Shipping</h2>
              <br/>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a style={{"color":"white"}} href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered at {order.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item style={{"backgroundColor":"black", "color":"white", "textAlign":"center"}}>
              <h2>Payment Method</h2>
              <br/>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
              <h2>Order Items</h2>
              <br/>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush"  style={{"border":"1px solid white"}}>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} style={{"backgroundColor":"black", "color":"white"}}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`} style={{"color":"white"}} />
                          {item.name} <strong>{item.size}</strong>
                        </Col>
                        <Col md={4}>{item.price}€</Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4} style={{"backgroundColor":"black"}}>
          <ListGroup variant="flush" style={{"backgroundColor":"black", "color":"white"}}>
            <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
              <h2>Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
              <Row>
                <Col> Items </Col>
                <Col>{order.itemsPrice}€</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
              <Row>
                <Col> Shippping </Col>
                <Col>{order.shippingPrice}€</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
              <Row>
                <Col> Total </Col>
                <Col>{order.totalPrice}€</Col>
              </Row>
            </ListGroup.Item>
            {!order.isPaid && (
              <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    layout="vertical"
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                    onButtonReady={() => setSdkReady(true)}
                  />
                )}
              </ListGroup.Item>
            )}
            {loadingDeliver && <Loader />}
            {userInfo &&
            userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item style={{"backgroundColor":"black", "color":"white"}}>
                <button type="submit" className="btn effect01" onClick={deliverHandler}>
                  Mark as "In Delivery"
                </button>
              </ListGroup.Item>
            )
            }

            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;



/*import React, {useState, useEffect} from "react"
import axios from "axios"
import { PayPalButton } from "react-paypal-button-v2"
import { Link } from "react-router-dom"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails, payOrder } from "../actions/orderActions"
import { ORDER_PAY_RESET } from "../constants/orderConstants"

function OrderScreen({ match }) {

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = orderPay

    if(!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, curr) => acc + curr.price, 0)

        order.shippingPrice = order.itemsPrice > 100 ? 25 : 0

        order.totalPrice = order.itemsPrice + order.shippingPrice
    }

    useEffect(() => {

        const addPayPalScript = async () => {
            const {data: clientId} = await axios.get("/api/config/paypal")
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        addPayPalScript()

        if(!order || successPay || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET})
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }


    return (
        loading ? <Loader /> : error  ?  <Message variant="danger">{error}</Message>  :
        <>
            
            <h1>Order {order === null ? null : order._id}</h1>
            <br/>
            <br/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong> {order.user.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant="success">Delivered at {order.deliveredAt}</Message> :
                                                <Message variant="danger">Not delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not paid</Message> }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Your order is empty</Message> : (
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}/>
                                                    {item.name} <strong>{item.size}</strong>
                                                </Col>
                                                <Col md={4}>
                                                    {item.price}€
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col> Items </Col>
                                <Col>{order.itemsPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col> Shippping </Col>
                                <Col>{order.shippingPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col> Total </Col>
                                <Col>{order.totalPrice}€</Col>
                            </Row>
                        </ListGroup.Item>
                        {console.log(sdkReady)}
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton layout="vertical" amount={order.totalPrice} onSuccess={successPaymentHandler} onButtonReady={() => {
                                            setSdkReady(true)
                                        }} />
                                    )}
                                
                                    {console.log(order.totalPrice)}
                                </ListGroup.Item>
                            )}
        
                        <ListGroup.Item>
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </>
    )
}

export default OrderScreen*/

