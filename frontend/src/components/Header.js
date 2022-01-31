import {React} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap"
import "./header.css"
import logo from "../assets/cvit.svg"
import { logout } from "../actions/userActions"

function Header() {

   
    const dispatch = useDispatch();


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logOutHandler = () => {
        dispatch(logout())
    }

    

    



    return (
        <header>
         {console.log(window.location.href)}
            <Navbar className="color-nav" variant="dark" expand="lg" collapseOnSelect>
            <Container>
            <LinkContainer to="/">
            <Navbar.Brand className="logo-container"><img src={logo} alt="f v n r l" /></Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container-fluid">
            <Nav.Item className="explore">
                    <a href="/products" className="simpleButton2">EXPLORE</a>    
            </Nav.Item>
                
                <Nav.Item className="center">
                    <h2 className="crossed" textTransform="lowercase">f v n r l</h2>
                </Nav.Item>
                <Nav.Item className="ml-auto">
                    <a href="/about" className="simpleButton2">ABOUT US</a>
                </Nav.Item>
                {userInfo ? (
                    <Nav.Item>
                    <div className="dropdown">
                        <button className="dropbtn simpleButton2" style={{"textTransform":"uppercase"}}>{userInfo.name}</button>
                        <div className="dropdown-content">
                            <a href="/account">Account      <i class="fas fa-user"></i></a>
                            <a href="" onClick={logOutHandler}>Logout       <i class="fas fa-sign-out-alt"></i></a>
                        </div>
                    </div>
                    </Nav.Item>
                    

                ) : <Nav.Item>
                        <a href="/login" className="simpleButton2">ACCOUNT</a>    
                </Nav.Item>}

                {userInfo && userInfo.isAdmin && (
                    <Nav.Item>
                    <div className="dropdown">
                        <button className="dropbtn simpleButton2">ADMIN</button>
                        <div className="dropdown-content">
                            <a href="/admin/userlist">Users     <i class="fas fa-users"></i></a>
                            <a href="/admin/productlist">Products       <i class="fas fa-tshirt"></i></a>
                            <a href="/admin/orderlist">Orders      <i class="fas fa-box"></i></a>
                        </div>
                    </div>
                    </Nav.Item>)} 
                
                <Nav.Item> 
                    <a href="/cart" className="simpleButton2"><i className="fas fa-shopping-cart"></i> CART</a>
                </Nav.Item>
            </Nav>
            
            </Navbar.Collapse>
            </Container>
            </Navbar>
            <hr className="hr-header"/>
        </header>
    )
}

export default Header;