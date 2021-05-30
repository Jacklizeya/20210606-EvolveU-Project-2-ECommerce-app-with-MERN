import React, {useEffect} from 'react'
import {Link} from "react-router-dom"
import {Carousel, Image} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import {listTopProducts} from "../actions/productAction"


export default function ProductCarousel() {
    // console.log("Entering ProductCarousel")
    const dispatch = useDispatch()
    const productTopRated = useSelector(state => state.productTopRated)
    // console.log(productTopRated)
    const {loading, error, products} = productTopRated
    // console.log("products", products)
    useEffect(()=>{
        // console.log("I am going to dispatch listtop products")
        dispatch(listTopProducts())}, [dispatch])

    return (
        loading? <Loader> </Loader> : error? <Message variant="danger"> {error} </Message>: 
        (<div>
            <Carousel pause="hover" className="bg-success" >
                {
                    products.map(product=> (
                        <Carousel.Item key={product._id}> 
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid/> 
                                <Carousel.Caption className="carousel-caption">
                                    <h2> {product.name} 3D {product.category} on sale ${product.price} CAD </h2>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item> ))
            }
            </Carousel>
        </div>)
    )
}
