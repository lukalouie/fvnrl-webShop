import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    address:
        {
                address: { type: String },
                city: { type: String },
                postalCode: { type: Number },
                country: { type: String }
        
        }

}, {
    timestamps: true
})

//dodaj metode useru
userSchema.methods.matchPassword = async function(enteredPass) {
    return await bcrypt.compare(enteredPass, this.password)
}

userSchema.pre("save", async function(next) {

    if(!this.isModified("password")) {
        next() // dalje
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)

export default User