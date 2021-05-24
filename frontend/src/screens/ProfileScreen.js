import React, {useState, useEffect} from 'react'

import {Table, Form, Button, Row, Col} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {getUserDetails, updateUserProfile} from "../actions/userAction"
import {listMyOrders} from "../actions/orderAction"
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstant"
 


export default function ProfileScreen( {location, history} ) {
//  This is going to focus on using local state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)



    // Check if use is logged in
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    // This is the main global state for this component: userDetails
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy

    useEffect(()=>{
        console.log("the profile screen")
        if (!userInfo) {
            console.log("unlogin status")
            history.push("/login")}  // if the user did not login, then go to the main page
        else { 

            // There was a moment it was going crazy, something is looping by itself
            console.log("login status")
            if(!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                console.log("there is nothing in userDetails.user.name after 1st login, I am going to get it now"); 
                dispatch(getUserDetails("profile"))
                console.log("going to grab the orders for this customer")
                dispatch(listMyOrders())
                console.log("got order listnow")
            }  // when we just login details is empty always, we need to initialize the details      
            else {
                console.log("after first login, I have all the information I need now, I am able to put the informaiton in")
                setName(user.name); setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch(register(name, email, password))
        if (password !== confirmPassword) {setMessage("Passwords do not match")} else {
            // DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({name, email, password}))  // an object is passing
        }
    }

//  all stuff inside is the children
    return (
        <Row>
            <Col md={3}> 
                <h2> User Profile </h2>
                <div>
                    {message && <Message variant="danger"> {message} </Message>}
                    {error && <Message variant="danger"> {error} </Message>}
                    {success && <Message variant="success"> Profile updated </Message>}
                    {loading && <Loader/>}
                </div>
                
                <Form onSubmit = {submitHandler} >

                    <Form.Group controlId="name">
                        <Form.Label> Name </Form.Label>
                        <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/> 
                    </Form.Group> 

                    <Form.Group controlId="email">
                        <Form.Label> Email Address </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
                    </Form.Group> 

                    <Form.Group controlId="password">
                        <Form.Label> password  </Form.Label>
                        <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/> 
                    </Form.Group>  

                    <Form.Group controlId="confirmPassword">
                        <Form.Label> confirm Password  </Form.Label>
                        <Form.Control type="confirmPassword" placeholder="Enter confirmPassword" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/> 
                    </Form.Group>

                    <Button type="submit" variant="primary"> Update </Button>
                </Form>
            </Col>
            <Col md={9}> 
                <h2> My orders </h2> 
                {loadingOrders? <Loader/> : errorOrders ? <Message variant="danger"> {errorOrders} </Message> : (
                    <Table striped bordered hover responsive className = "table-sm"> 
                        <thead> 
                            <tr>
                                <th> ID </th>
                                <th> DATE </th>
                                <th> TOTAL </th>
                                <th> PAID </th>
                                <th> DELIVERED </th>
                                <th> DELIVERED </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=>{return (
                                <tr key={order._id}>
                                    <td> {order._id} </td>
                                    <td> {order.createdAt.substring(0, 10)} </td>
                                    <td> {order.totalPrice} </td>
                                    <td> {order.isPaid ? order.paidAt.substring(0, 10): (<i className="fas fa-times" style={{color: "red"}}> </i>)} </td>
                                    <td> {order.isDelivered ? order.deliveredAt.substring(0, 10): (<i className="fas fa-times" style={{color: "red"}}> </i>)} </td>
                                    <td> 
                                        <LinkContainer to={`/order/${order._id}`}> 
                                            <Button variant="light" className="btn-sm" > Details </Button> 
                                        </LinkContainer> 
                                    </td>
                                </tr> 
                            )})}               
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}
