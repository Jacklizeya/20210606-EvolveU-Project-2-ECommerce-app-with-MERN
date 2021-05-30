// generate by race

import React, { useEffect, useState} from 'react'
import Meta from "../components/Meta"
import {useDispatch, useSelector} from "react-redux"
// import products from "../products" *** data will come from backend later
import {Row, Col, Form} from "react-bootstrap"
// so many modular component from bootstrap.js, also boostrap.css
import Product from "../components/Product"
import {listProducts} from "../actions/productAction"
import Message from  "../components/Message"
import Loader from  "../components/Loader"
import Paginate from "../components/Paginate"
import ProductCarousel from '../components/ProductCarousel'
import {Link} from "react-router-dom"

const HomeScreen = ({match}) => {
    // const [products, setProducts] = useState([]) once we have Redux to manager the global state, we phase this out
//  There are lots of limitation to useEffect, 1st argument is function, cannot use Async there, have to define one, then invoke it
//  for axios, response.data is the one we want 
    const dispatch = useDispatch()
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const [category, setCategory] = useState("")

    const productList = useSelector(state => state.productList)
    const {loading, error, products, page, pages} = productList // destruction a good way to extra data

    useEffect( ()=> {
        console.log("entering homescreenuseEffect")
        // const fetchProducts = async () => {const {data} = await axios.get("/api/products"); setProducts(data)}
        // fetchProducts(); This is phased out as we want to integrate Redux
        dispatch(listProducts(keyword, pageNumber, category))
    }, [dispatch, keyword, pageNumber, category])
     
    // dispatch the async function middle ware, dispatch as dependency to avoid warning

    return (
        <div>  
            <Meta/>
            {!keyword ? <ProductCarousel/> : <Link to="/" className="btn btn-light">Go Back</Link>}
            <br/>
            <Form.Group controlId="category" className="w-25">   
                <Form.Label> Select Category </Form.Label>
                <Form.Control as="select" value={category} onChange={e => setCategory(e.target.value)}>        
                        <option value=""> Show All </option>
                        <option value="printer"> printer </option>
                        <option value="scanner"> scanner </option>
                        <option value="filament"> filament </option>
                        <option value="pen"> pen </option>
                        <option value="figure"> figure </option>
                        <option value="accessory"> accessory </option>
                                        
                </Form.Control>
            </Form.Group> 

            {loading? <Loader/>: error? <Message variant="danger"> {error} </Message> : 
            (
            <div>
                <Row>
                { products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                            <Product product={product}/>
                        </Col>
                        ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword: ""}>
                
                </Paginate>
            </div>)}           
        </div>
    )
}


export default HomeScreen
