import {React, useState} from 'react'
import { Link } from "react-router-dom"
import { Card } from "react-bootstrap"
import "./product.css"
import Rating from "./Rating" 


function Product({ product }) {

    
    

    return (
        <Card className="my-3 p-3 cardFlash">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                <Card.Title as="div">
                <strong><b>{product.name}</b></strong>
                </Card.Title>
                </Link>

                <Card.Text>
                    <Rating 
                    color="black"
                    value={product.rating} 
                    text={`  ${product.numReviews} reviews`}
                    />
                </Card.Text>
                <Card.Text as="h3" style={{"color":"black"}}>{product.price}€</Card.Text>
            </Card.Body>
        </Card>
    )
}

/*import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';

export default function Product( { product }) {
  return (
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/111.jpg' fluid alt='...' />
        <a>
          <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
        </a>
      </MDBRipple>
      <MDBCardBody>
        <MDBCardTitle>Card title</MDBCardTitle>
        <MDBCardText>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </MDBCardText>
        <MDBBtn href='#'>Button</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}*/

export default Product
