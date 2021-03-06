// rafce: arrow function component export

import React from 'react'
import { LinkContainer } from "react-router-bootstrap"
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { SearchBox } from "./SearchBox"
import { logout } from "../actions/userAction"
import { Route } from "react-router-dom"


const Header = () => {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = (e) => {
        dispatch(logout())
    }

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    let totalItem = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);


    // attempt bug fix for video 50

    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>


                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src='/images/4Gicon.png' alt='Image' height='100' width='150' className='ml-sm-3'></img>
                        </Navbar.Brand>
                    </LinkContainer>

                    <LinkContainer to="/">
                        <Navbar.Brand> 3D Store </Navbar.Brand>
                    </LinkContainer>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar id="basic-navbar-nav">

                        <Route render={
                            ({ history }) => (<SearchBox history={history} />)} />


                        <Nav className="ml-auto">

                            <LinkContainer to="/cart">
                                <Nav.Link>

                                    {/* <p>{cartItems.length}</p> */}
                                    <i className="fas fa-shopping-cart"> </i>  {cartItems.length >= 1 && <span id='numI'>{totalItem}</span>}
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ?
                                <NavDropdown title={userInfo.name}>
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item> Profile </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
                                </NavDropdown> :
                                (<LinkContainer to="/login">
                                    <Nav.Link > <i className="fas fa-user"> </i>Sign In</Nav.Link>
                                </LinkContainer>)}
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item> Users </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item> Products </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item> Orders </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>)
                            }
                        </Nav>
                    </Navbar>
                </Container>
            </Navbar>
        </header>


    )
}

export default Header


// source of Nav bar https://react-bootstrap.github.io/components/navbar/