

import React from 'react';
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Product = ({ product }) => {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;  // this return an array
    const checkItem = cartItems.some((item) => {
        return item.product === product._id;
    });
    return (

        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div"><strong> {product.name} </strong> </Card.Title>
                </Link>
            </Card.Body>
            <Card.Text as="div">
                <Rating value={product.rating}
                    text={`${product.numReviews} reviews`}
                />
            </Card.Text>

            <Card.Text as='h5'>{checkItem ?
                <p as='h6' style={{ backgroundColor: 'yellow' }}>Added to 🛒</p> :
                <p as='h5'>${product.price}</p>}
            </Card.Text>
        </Card>
    );
}

export default Product