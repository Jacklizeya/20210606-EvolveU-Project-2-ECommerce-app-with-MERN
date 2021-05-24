import React, {useState } from 'react'

import {Form, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import FormContainer from "../components/FormContainer"
import {savingShippingAddress} from "../actions/cartAction"
import CheckoutSteps from "../components/CheckoutSteps"

export default function ShippingScreen({history}) {
    
    const dispatch = useDispatch()
    // extra some information for localstorage, cache?
    const cart = useSelector(state => state.cart)
    console.log("cart", cart)
    const {shippingAddress} = cart

    // This is all local state  
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)    
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => { 
        e.preventDefault()
        console.log("submit")
        // dispatch 
        dispatch(savingShippingAddress({address, city, postalCode, country}))
        // The component level block form variable is sent to global level variable
        history.push("/payment")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 > </CheckoutSteps>
            <h1> Shipping </h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="address">
                    <Form.Label> address </Form.Label>
                    <Form.Control type="text" placeholder="Enter address" value={address} required onChange={(e)=>{setAddress(e.target.value)}}/> 
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Label> city </Form.Label>
                    <Form.Control type="text" placeholder="Enter city" value={city} required onChange={(e)=>{setCity(e.target.value)}}/> 
                </Form.Group>

                <Form.Group controlId="postalCode">
                    <Form.Label> postalCode </Form.Label>
                    <Form.Control type="text" placeholder="Enter postalCode" value={postalCode} required onChange={(e)=>{setPostalCode(e.target.value)}}/> 
                </Form.Group>

                <Form.Group controlId="country">
                    <Form.Label> country </Form.Label>
                    <Form.Control type="text" placeholder="Enter country" value={country} required onChange={(e)=>{setCountry(e.target.value)}}/> 
                </Form.Group>
            
                <Button  type="submit" variant="primary"> Continue </Button>
            </Form>
        </FormContainer>
    )
}
