import React, { useState, useEffect } from 'react'
import axios from "axios"

import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"

import Loader from "../components/Loader"
import Message from "../components/Message"
import { getOrderDetails, payOrder, deliverOrder } from "../actions/orderAction"
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET, ORDER_LIST_MY_RESET, } from "../constants/orderConstants";
import { PRODUCT_UPDATE_INSTOCK_RESET } from '../constants/productConstants';
import { removeFromCart } from '../actions/cartActions';
import { updateProductInStock } from '../actions/productActions';



export default function OrderScreen({ match, history }) {
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

    // set up all the initial state
    const orderId = match.params.id; console.log(`orderId is ${orderId}`)
    const [sdkReady, setSdkReady] = useState(false)
    const { order, loading, error } = useSelector(state => state.orderDetails)
    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay)  //this is second bug for 20210520
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const [countInStock, setCountInStock] = useState(0);
    const dispatch = useDispatch()

    const productUpdateInStock = useSelector((state) => state.productUpdateStock);
    const { success: successInStockUpdate } = productUpdateInStock;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;


    useEffect(() => {
        if (!userInfo) { history.push("/login") }

        const addPayPalScript = async () => {
            console.log("order screen paypal api")
            const { data: clientId } = await axios("/api/config/paypal")
            // sdk is software development kit? Insert 3-rd party script into HTML
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.async = true
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.onload = () => { setSdkReady(true) }
            document.body.appendChild(script)
        }


        // I reoganize this part, we do not need order here! otherwise it is infinite loop 
        // tutorial makes it too complicated
        dispatch({ type: ORDER_PAY_RESET })
        dispatch({ type: ORDER_DELIVER_RESET })
        dispatch(getOrderDetails(orderId))
        if (!order.isPaid) { if (!window.paypal) { addPayPalScript() } else { setSdkReady(true) } }


        if (successInStockUpdate) {
            console.log('PRODUCT_UPDATE_INSTOCK_RESET');
            dispatch({ type: PRODUCT_UPDATE_INSTOCK_RESET });
        }

        if (order && successPay) {
            console.log('sale delete looping start');
            order.orderItems.forEach((item, i) => {
                console.log(
                    `countinstock: ${cartItems[i].countInStock}
                -
              qty: ${item.qty}
            Equals: ${cartItems[i].countInStock - item.qty}`
                );
                const updatedStock = cartItems[i].countInStock - item.qty;
                setCountInStock(cartItems[i].countInStock - item.qty);
                dispatch(
                    updateProductInStock({
                        _id: item.product,
                        countInStock: updatedStock,
                    })
                );
                dispatch(removeFromCart(item.product));
            });
            dispatch({ type: ORDER_LIST_MY_RESET });
        }
    }, [
        history,
        userInfo,
        dispatch,
        orderId,
        successPay,
        successDeliver,
        order,
        cartItems,
        countInStock,
        successInStockUpdate,
    ]);

    const successPaymentHandler = (paymentResult) => {
        console.log("paymentResult", paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => { return Number(acc + item.price * item.qty) }, 0)
        order.shippingPrice = (order.itemsPrice < 1000 ? Number((order.itemsPrice * 0.1).toFixed(2)) : 0)
    }



    return (
        loading ? <Loader> </Loader> : error ? <Message> {error} </Message> :
            <div>
                <h1> Order {order._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup>
                            <h2> Payment Method </h2>

                            <p><strong> Method: </strong>
                                {order.paymentMethod}</p>
                            {order.isPaid ? <Message> Paid on {order.paidAt} </Message> : <Message> Not Paid</Message>}

                        </ListGroup>


                        <ListGroup variant="flush">
                            <h2> Shipping </h2>
                            <strong> Name: </strong>
                            {order.user && order.user.name}
                            {order.user && <a href={`mailto:${order.user.email}`}>  </a>}

                            <p>
                                Address <br />
                                {order.shippingAddress.address}, <br />
                                {order.shippingAddress.city},
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success"> Delivered on {order.deliveredAt}</Message> :
                                <Message variant="danger"> Not Delivered </Message>}

                        </ListGroup>



                        <ListGroup>
                            <h2> Order Items </h2>
                            {order.orderItems.length === 0 ? <Message> Your order is empty </Message> : (
                                <ListGroup>
                                    {order.orderItems.map((item, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid />
                                                    </Col>
                                                    <Col >
                                                        <Link to={`/product/${item.product}`} />
                                                        {item.name}
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            )}
                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2> Order Summary </h2>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col> Items </Col>
                                        <Col> ${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col> 10% Shipping Fee (free for items over $1000) </Col>
                                        <Col> ${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col> Tax </Col>
                                        <Col> ${order.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col> Total </Col>
                                        <Col> ${order.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>

                                {userInfo && !order.isPaid && (
                                    <ListGroup.Item>
                                        {loadingPay && <Loader />}
                                        {!sdkReady ? <Loader /> : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />)}
                                    </ListGroup.Item>)
                                }


                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div>
    )
}

// this <PayPal Button> must have some built-in like onClick = talk to paypal server
// !!! WARNING: PayPalButton, not Paypal button
// Here we only need to know on Success, it is going to pass us the paymentresult
