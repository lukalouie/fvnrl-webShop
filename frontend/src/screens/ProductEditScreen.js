import axios from "axios"
import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { listProductDetails, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import "./inputs.css"

function ProductEditScreen({ match, history }) {

    const productId = match.params.id

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [typeId, setTypeId] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [rating, setRating] = useState(0)
    const [numReviews, setNumReviews] = useState(0)
    const [xs, setXs] = useState(0)
    const [s, setS] = useState(0)
    const [m, setM] = useState(0)
    const [l, setL] = useState(0)
    const [xl, setXl] = useState(0)
    const [uploading, setUploading] = useState(false)
    const [backText, setBackText] = useState(false)


    function handleClicked() {
        setBackText(true)
    }
    
    function handleOut() {
        setBackText(false)
    }
    

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = productUpdate
   
    useEffect(() => {{
        if(successUpdate) {
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push("/admin/productlist")
        } else {
            if(!product.name || product._id!==productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setTypeId(product.typeID)
                setImage(product.image)
                setCategory(product.category)
                setDescription(product.description)
                setRating(product.rating)
                setNumReviews(product.numReviews)
                setXs(product.countAndSize.xs)
                setS(product.countAndSize.s)
                setM(product.countAndSize.m)
                setL(product.countAndSize.l)
                setXl(product.countAndSize.xl)
            }
        }
        }
    }, [history, product, dispatch, productId, successUpdate])

    const uploadFileHandler = async (e) => { //async jer je http req

        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/upload", formData, config)
            
            setImage(data) //path postavljamo na image
            setUploading(false)
    } catch (error) {
        console.error(error)
        setUploading(false)
    }
}
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            typeID: typeId,
            image,
            category,
            description,
            rating,
            numReviews,
            countAndSize: {
                xs,
                s,
                m,
                l,
                xl
            }
        })
        )
        
    }



    return (
        <div style={{"marginLeft":"3rem", "marginRight":"3rem"}}>
            <Link to="/admin/productlist" className="fill my-3" style={{textDecoration: backText ? "line-through" : "none", "color":"white", "borderColor":"white" }} onMouseOver={handleClicked} onMouseOut={handleOut} type="button">
                <strong>BVCK</strong>
            </Link>
            <FormContainer>
        <h2 style={{textAlign:"center", color:"5f021f"}}>Product</h2>
        <br/>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <input type="text" name="name" className="question inputex" id="nme" value={name} requiredAutocomplete="off" onChange={(e) => setName(e.target.value)} />
                <label className="labelex textareaex" for="nme" style={{"color":"white"}}><span className="spanex">Name?</span></label>
            </Form.Group>

            <Form.Group controlId="price">
                <input placeholder="0" type="number" name="price" className="question inputex" id="prc" value={price} requiredAutocomplete="off" onChange={(e) => setPrice(e.target.value)} />
                <label className="labelex textareaex" for="prc" style={{"color":"white"}}><span className="spanex">Price?</span></label>
            </Form.Group>
            
            <Form.Group controlId="typeID">
                <input type="text" name="typeId" className="question inputex" id="tID" value={typeId} requiredAutocomplete="off" onChange={(e) => setTypeId(e.target.value)} />
                <label className="labelex textareaex" for="tID" style={{"color":"white"}}><span className="spanex">TypeID?</span></label>
            </Form.Group>

            <Form.Group controlId="image">
                <input type="text" name="image" className="question inputex" id="pic" value={image} requiredAutocomplete="off" onChange={(e) => setImage(e.target.value)} />
                <label className="labelex textareax" for="pic" style={{"color":"white"}}><span className="spanex">Image?</span></label>
                <Form.File id="image-file" custom onChange={uploadFileHandler}></Form.File> 
                {uploading && <Loader />} 
            </Form.Group>

            <br/>
            <br/>
            <br/>

            <Form.Group controlId="category">
                <input type="text" name="category" className="question inputex" id="ctg" value={category} requiredAutocomplete="off" onChange={(e) => setCategory(e.target.value)} />
                <label className="labelex textareax" for="ctg" style={{"color":"white"}}><span className="spanex">Category?</span></label>
            </Form.Group>

            <Form.Group controlId="description">
                <input type="text" name="description" className="question inputex" id="dsc" value={description} requiredAutocomplete="off" onChange={(e) => setDescription(e.target.value)} />
                <label className="labelex textareax" for="dsc" style={{"color":"white"}}><span className="spanex">Description?</span></label>
            </Form.Group>

            <Form.Group controlId="rating">
                <input placeholder="0" type="number" name="rating" className="question inputex" id="rtg" value={rating} requiredAutocomplete="off" onChange={(e) => setRating(e.target.value)} />
                <label className="labelex textareaex" for="rtg" style={{"color":"white"}}><span className="spanex">Rating?</span></label>
            </Form.Group>

            <Form.Group controlId="numReviews">
                <input placeholder="0" type="number" name="numReviews" className="question inputex" id="rws" value={numReviews} requiredAutocomplete="off" onChange={(e) => setNumReviews(e.target.value)} />
                <label className="labelex textareaex" for="rws" style={{"color":"white"}}><span className="spanex">Number of reviews_?</span></label>
            </Form.Group>

            <Form.Group controlId="xs">
                <input placeholder="0" type="number" name="xs" className="question inputex" id="xs" value={xs} requiredAutocomplete="off" onChange={(e) => setXs(e.target.value)} />
                <label className="labelex textareaex" for="xs" style={{"color":"white"}}><span className="spanex">Number of XSs?</span></label>
            </Form.Group>

            <Form.Group controlId="s">
                <input placeholder="0" type="number" name="s" className="question inputex" id="s" value={s} requiredAutocomplete="off" onChange={(e) => setS(e.target.value)} />
                <label className="labelex textareaex" for="s" style={{"color":"white"}}><span className="spanex">Number of Ss?</span></label>
            </Form.Group>

            <Form.Group controlId="m"> 
                <input placeholder="0" type="number" name="m" className="question inputex" id="m" value={m} requiredAutocomplete="off" onChange={(e) => setM(e.target.value)} />
                <label className="labelex textareaex" for="m" style={{"color":"white"}}><span className="spanex">Number of Ms?</span></label>
            </Form.Group>

            <Form.Group controlId="l">
                <input placeholder="0" type="number" name="l" className="question inputex" id="l" value={l} requiredAutocomplete="off" onChange={(e) => setL(e.target.value)} />
                <label className="labelex textareaex" for="l" style={{"color":"white"}}><span className="spanex">Number of Ls?</span></label>
            </Form.Group>

            <Form.Group controlId="xl">
                <input placeholder="0" type="number" name="xl" className="question inputex" id="xl" value={l} requiredAutocomplete="off" onChange={(e) => setXl(e.target.value)} />
                <label className="labelex textareaex" for="xl" style={{"color":"white"}}><span className="spanex">Number of XLs?</span></label>
            </Form.Group>

            <Button type="submit" className="btn effect01">
                Update
            </Button>

        </Form>
        )}
        
            
        </FormContainer>
        </div>
        
    )
}

export default ProductEditScreen
