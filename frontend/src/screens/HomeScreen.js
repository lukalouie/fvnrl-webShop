import React, { useEffect, useState } from 'react'
import home1 from "../assets/home1.svg"
import home2 from "../assets/home2.svg"
import "./homeScreen.css"



function HomeScreen() {

    

    /*const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {           //gonna run as soon as component loads
            dispatch(listProducts())
    }, [dispatch])

    const product1 = (typeof(products) === 'undefined' ? null : products[0])
    const product2 = (typeof(products) === 'undefined' ? null : products[1])*/

    
    return (
    <>
        <body className="homeBody containerHome">
        <div className="homeDiv">
        <a href="/products"><img src={home1} onMouseEnter={e => (e.currentTarget.src = home2)} onMouseLeave={e => (e.currentTarget.src = home1)} alt="" className="homePic"/></a>
        <h1 className="h1Home" style={{"fontFamily":"UnifrakturMaguntia"}}>f v n r l</h1>
        <h6 style={{"textAlign":"center"}}><i>- find elegance in death.</i></h6>
        </div>
     </body> 
</>
    )
}
export default HomeScreen
