import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Form, Button} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {getUserDetails, updateUsers} from "../actions/userAction"
import FormContainer from "../components/FormContainer"
import {USER_UPDATE_PROFILE_RESET} from "../constants/userConstant"

export default function UserEditScreen( {match, history} ) {
//  This is going to focus on using local state
    const userId = match.params.id

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    // This is the main global state for this component: userDetails
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate
    console.log("user", user)
    
//  this is side effect, something else needs to be updated too
    useEffect(()=>{
        if (successUpdate) {dispatch({type: USER_UPDATE_PROFILE_RESET}); history.push("/admin/Userlist")} else {
            if (! user.name || user._id !==userId ) 
            {dispatch(getUserDetails( userId )); console.log("useEffect", user)} else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)}}
    }, [user, dispatch, history, userId, successUpdate])

//  this is direct effect, dispatch update
    const submitHandler = (e) => {
        e.preventDefault()       
        dispatch(updateUsers({_id: userId, name, email, isAdmin}))
    }

//  all stuff inside is the children
    return (

        <div>
            
            <Link to= "/admin/userlist" className="btn btn-light my-3"> Go Back </Link>
            <FormContainer>
                 <h1> Edit User </h1>
                {loadingUpdate && <Loader> </Loader>}
                {errorUpdate && <Message variant="danger"> {error.update} </Message>}
                {loading? <Loader> </Loader> : error?( <Message variant="danger"> {error} </Message>) :  (

                <Form onSubmit = {submitHandler} >

                <Form.Group controlId="name">
                    <Form.Label> Name </Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=>{setName(e.target.value)}}/> 
                </Form.Group> 

                <Form.Group controlId="email">
                    <Form.Label> Email Address </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/> 
                </Form.Group> 

                <Form.Group controlId="isAdmin">
                    <Form.Check type="checkbox"  label="isAdmin" checked={isAdmin} onChange={(e)=>{setIsAdmin(e.target.checked)}}/> 
                </Form.Group>  

                <Button type="submit" variant="primary"> Update </Button>
                </Form>
            )}
            

            
             </FormContainer>
        </div>
        
    )
}
