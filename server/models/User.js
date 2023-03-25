import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{
        type:String,
        required:[true, "Email is required..."],
        validate:{
            validator: validator.isEmail,
            message: "Please provide valid email"
        },
    },
    password:{
        type:String,
        required:[true, "Please provide password..."],
        minLength:6
    },
    userName:{
        type: String,
        required: [true, "Username must be provided..."],
        unique: true,
    },
    dateOfBirth: Date,
})

userSchema.pre("save", async function(){
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

const User = mongoose.model("User", userSchema)

export default User;