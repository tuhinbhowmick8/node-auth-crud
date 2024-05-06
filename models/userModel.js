import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, 'Name is required']
        },
        lastname:{
            type: String,
        },
        email:{
            type:String,
            required:[true, 'Email is required'],
            unique: true,
            validate: validator.isEmail
        },
        password:{
            type:String,
            required:[true, 'password is required'],
            minlenghth:[5, "password length should be more then 6 chacters"],
            select: true
        },
        location:{
            type:String,
            default:'India'
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

// comapre password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}



// Json Webtoken
userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id}, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
}



export default mongoose.model('Users', userSchema)