import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom"
import {Row, Col, Image, ListGroup, Card, Button, Form} from "react-bootstrap"
import Rating from "../components/Rating"
import {useDispatch, useSelector} from "react-redux"
// import products from "../products"
// import axios from "axios"
import {listProductDetails, createProductReview} from "../actions/productAction"
import Message from  "../components/Message"
import Loader from  "../components/Loader"
import Meta from "../components/Meta"
import {PRODUCT_CREATE_REVIEW_RESET} from "../constants/productConstants"

// props.match is the url in the react system
const ProductScreen = ({history, match}) => {
    // const [product, setProduct] = useState({})
//  There are lots of limitation to useEffect, 1st argument is function, cannot use Async there, have to define one, then invoke it
//  for axios, response.data is the one we want 
    const dispatch = useDispatch()


    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const productDetails = useSelector(state => state.productDetails)
    // state ---- reducer ---- loading, error, product
    const {loading, error, product} = productDetails // destruction a good way to extra data 

    const productCreateReview = useSelector(state => state.productCreateReview)
    // state ---- reducer ---- loading, error, product
    const {success: successProductReview, error: errorProductReview, } = productCreateReview // destruction a good way to extra data 

    const userLogin = useSelector(state => state.userLogin)
    // state ---- reducer ---- loading, error, product
    const { userInfo } = userLogin // destruction a good way to extra data 

    useEffect( ()=> {
        // const fetchProduct = async () => {const {data} = await axios.get(`/api/products/${match.params.id}`); setProduct(data)}
        // fetchProduct();
        if (successProductReview) {
            alert("Review Submitted")
            setRating(0)
            setComment("")
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(match.params.id))
    }, [match, dispatch, successProductReview])

    // const product = products.find(product => product._id === match.params.id)

    const addToCartHandler = () => {
        console.log("start Redirecting to cart page")
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {rating, comment}))
    }

    
    return (
        
        <div>
           
            <Link className = "btn btn-light my-3" to="/"> Go Back </Link>

            {loading? <Loader/> : error? <Message variant="danger"> {error} </Message> : (
                <>
                <Meta title={product.name}/>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant = "flush"> 
                        <ListGroup.Item>
                            <h3> {product.name} </h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h6> Category: 3D {product.category} </h6>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item> 
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong> {product.price} </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item> 
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0? "In Stock" : "Out of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col> 
                                            <Form.Control as="select" value={qty} onChange={(e)=>{console.log("change"); setQty(Number(e.target.value))}}> 
                                                {[...Array(product.countInStock).keys()].map(
                                                    (num) => (<option key={num+1} value={num+1}> 
                                                            {num+1}
                                                        </option>))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>                           
                                <Button 
                                className= "btn-block" 
                                type="button" 
                                disabled={product.countInStock === 0}
                                onClick = {addToCartHandler}
                                >
                                    Add to cart
                                </Button> 
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h2> Reviews </h2>
                    {product.reviews.length === 0 && <Message> No Reviews </Message>}      
                    <ListGroup variant="flush"> 
                    <h2> Test </h2>
                            {product.reviews.map(review => 
                                    (
                                        <ListGroup.Item key={review._id}>
                                            <strong> {review.name} </strong>
                                            <Rating value={review.rating}> </Rating>
                                            <p> {review.createdAt.substring(0, 10)}  </p>
                                            <p> {review.comment}  </p>
                                        </ListGroup.Item>
                                    )
                            )}
                            <ListGroup.Item>
                                <h2> Write a customer review </h2>
                                {errorProductReview && <Message variant="danger"> {errorProductReview} </Message> }
                                {userInfo? (
                                    <Form onSubmit = {submitHandler}> 
                                        <Form.Group controlId="rating">
                                            <Form.Label> Rating </Form.Label>
                                            <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
                                            
                                                <option value=""> Select... </option>
                                                <option value="1"> 1 - Poor </option>
                                                <option value="2"> 2 - Fair </option>
                                                <option value="3"> 3 - Good </option>
                                                <option value="4"> 4 - Very Good </option>
                                                <option value="5"> 5 - Excellent </option>

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="comment">
                                            <Form.Label> Comment </Form.Label>
                                            <Form.Control as="textarea" row="3" value={comment} onChange = {(e)=>{setComment(e.target.value)}}> Comment </Form.Control>
                                        </Form.Group>
                                        <Button type="submit" variant="primary"> Submit Reivews </Button>
                                    </Form>) :
                                (<Message> Please <Link to="/login"> sign in </Link> to write a review {''} </Message> )}
                            </ListGroup.Item>
                    </ListGroup>                              
                </Col>
            </Row>
            </>
            )}
    
        </div>
    )
}

export default ProductScreen


// The match object in router case
// import is more like file path
// to is url
// In react, when you talk about src, it means something in the public folder