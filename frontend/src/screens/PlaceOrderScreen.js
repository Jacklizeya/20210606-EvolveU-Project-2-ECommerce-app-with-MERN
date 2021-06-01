import React , {useEffect} from 'react'


import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import CheckoutSteps from "../components/CheckoutSteps"
import Message from "../components/Message"
import {createOrder} from "../actions/orderAction" 

export default function PlaceOrderScreen({history}) {
    
    const cart = useSelector(state => state.cart)

    // Calculate prices, toFixed is converting number to string
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => {return Number(acc + item.price * item.qty)}, 0)
    cart.shippingPrice = (cart.itemsPrice < 1000 ? Number((cart.itemsPrice * 0.1).toFixed(2)) : 0)
    cart.taxPrice = Number((0.05 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = Number((cart.itemsPrice + cart.shippingPrice + cart.taxPrice).toFixed(2))

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success, error} = orderCreate



    // convert cart in Redux to Order in MongoDB
    const dispatch = useDispatch( )
    const placeOrderHandler = () => {
        console.log("entering placeorder handler")
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
        console.log("going to createOrder")
        }

        console.log("success on line24", success)
        useEffect(()=>{
            if (success) {
                console.log("success and order", success, order)
                history.push(`/order/${order._id}`)
                console.log("jump to new page is done")
            }
        }, [history, success])


    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4> </CheckoutSteps>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <h2> Shipping </h2>
                        <p> 
                            <strong> Address </strong>
                            {cart.shippingAddress.address}, <br/>
                            {cart.shippingAddress.address},  <br/>
                            {cart.shippingAddress.postalCode}, <br/>
                            {cart.shippingAddress.country} <br/>
                        </p>
        
                    </ListGroup>

                    <ListGroup>
                        <h2> Payment Method </h2>
                        <strong> Method: </strong> 
                        {cart.paymentMethod}
                    </ListGroup>            

                    <ListGroup>
                        <h2> Order Items </h2>
                        {cart.cartItems.length === 0 ? <Message> Your cart is empty </Message> : (
                            <ListGroup> 
                                {cart.cartItems.map((item, index)=>{return (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid />
                                            </Col>
                                            <Col >
                                                <Link to={`/product/${item.product}`}/>
                                                {item.name}
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Col> 
                                        </Row>
                                    </ListGroup.Item>
                                )})}
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
                                    <Col> ${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                          
                            <ListGroup.Item>
                                <Row>
                                    <Col> 10% Shipping Fee (free for items over $1000) </Col>
                                    <Col> ${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> Tax </Col>
                                    <Col> ${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col> Total </Col>
                                    <Col> ${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error &&  <h1 variant="danger">  {error}  </h1>}
                            </ListGroup.Item>


                            <ListGroup.Item>
                                <Button type="button" className="btn-block" disabled={cart.cartItems===0} 
                                onClick={placeOrderHandler}> PlaceOrder </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    
                    </Card>               
                
                </Col>


            </Row>
        </div>
    )
}
