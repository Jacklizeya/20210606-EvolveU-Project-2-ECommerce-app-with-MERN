import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form, Button, Row, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {register} from "../actions/userAction"
import FormContainer from "../components/FormContainer"

export default function RegisterScreen( {location, history} ) {
//  This is going to focus on using local state
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    // redirect to home page? not fully understand it yet...
    const redirect = location.search? location.search.split("=")[1]: "/"

    useEffect(()=>{
        if (userInfo) {history.push(redirect)}
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch(register(name, email, password))
        if (password !== confirmPassword) {setMessage("Passwords do not match")} else {
            dispatch(register(name, email, password))}
    }

//  all stuff inside is the children
    return (
        <FormContainer>
            <h1> Sign Up </h1>

            {message && <Message variant="danger"> {message} </Message>}
            {error && <Message variant="danger"> {error} </Message>}
            {loading && <Loader/>}

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

                <Button type="submit" variant="primary"> Register </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Have an account ? <Link to={redirect? `/login?redirect=${redirect}`:"/login"}> Login </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
