import React from 'react'
import { Spinner } from "react-bootstrap"

function Loader() {
    return (
        <Spinner animation="border" role="status" style={{width: "100px",
                                                          height: "100px",
                                                          marginTop: "20%",
                                                          marginLeft: "40%",
                                                          display: "block",
                                                          color: "white"
        }}>

          <span className="sr-only">Loading...</span>  
            
        </Spinner>
    )
}

export default Loader
