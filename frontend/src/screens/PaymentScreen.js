import React, {useState} from 'react'

import {Form, Button, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import {savePaymentMethod} from "../actions/cartAction"
import CheckoutSteps from "../components/CheckoutSteps"

export default function PaymentScreen({history}) {
    
    const dispatch = useDispatch()
    // extra some information for localstorage, cache?
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if (!shippingAddress) {history.push("/shipping")}

    // This is all local state  
    const [paymentMethod, setPaymentMethod] = useState("paypal")
    
    const submitHandler = (e) => { 
        e.preventDefault()
        console.log("submit")
        // dispatch 
        dispatch(savePaymentMethod(paymentMethod))
        // The component level block form variable is sent to global level variable
        history.push("/placeOrder")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 > </CheckoutSteps>
            <h1> Payment </h1>
            <Form onSubmit={submitHandler}>

               
            
                <Form.Group>
                        <Form.Label as="legend"> Select Method </Form.Label>
                    <Col>
                        <Form.Check 
                            type="radio" 
                            label="Creditcard" 
                            id="PayPal" 
                            name="paymentMethod" 
                            value="Credit Card" 
                            disabled
                            onChange={(e) => setPaymentMethod(e.target.value)}> 
                        </Form.Check>
                        <Form.Check 
                            type="radio" 
                            label="Strip" 
                            id="Strip" 
                            name="paymentMethod" 
                            value="Strip"            
                            disabled             
                            onChange={(e) => setPaymentMethod(e.target.value)}> 
                        </Form.Check>
                        <Form.Check 
                            type="radio" 
                            label="Paypal" 
                            id="PayPal" 
                            name="paymentMethod" 
                            value="Paypal"                             
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}> 
                        </Form.Check>
                    </Col>
                </Form.Group>
            
                <Button  type="submit" variant="primary"> Continue </Button>
            </Form>
        </FormContainer>
    )
}
