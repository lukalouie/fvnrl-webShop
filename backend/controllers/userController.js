import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/generateToken.js"

// desc: auth user & get token
// route: POST /api/users/login
// access: public

const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body

    const user = await User.findOne({ email })

    if(user && await (user.matchPassword(password))) {
        res.json( {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// desc: register new user
// route: POST /api/users
// access: public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body

    const userExists = await User.findOne({ email })

    if(userExists) {
        res.status(400)   // 400 - bad request
        throw new Error("This email is already in use")
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            address: user.address,
            token: generateToken(user._id)
        }) // 201 - something is created
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//get user profile
//get api/users/profile
//private

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// desc: update user
// route: PUT /api/users/profile
// access: private

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json( {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            address: updatedUser.address,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(401)
        throw new Error("User not found")
    }
})

//get users
//get api/users
//private/admin

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find()

    res.json(users)
})

// desc: delete user
// route: DELETE /api/users/:id
// access: private/admin

const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if(user) {
        await user.remove()
        res.json({ message: "User removed"})
    } else {
        res.status(401)
        throw new Error("User not found")
    }
})

// desc: get user by id
// route: DELETE /api/users/:id
// access: private/admin

const getUserById = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password")

    if(user) {
        res.json(user)
    } else {
        res.status(401)
        throw new Error("User not found")
    }
})

// desc: update user
// route: PUT /api/users/:id
// access: private/admin

const updateUserAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save()

        res.json( {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        res.status(401)
        throw new Error("User not found")
    }
})


export  {
    authUser,
    registerUser,
    getUserProfile,
    updateUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUserAdmin
}