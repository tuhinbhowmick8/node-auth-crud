import userModel from "../models/userModel.js";

export const registerController=async(req, res, next)=>{
try{
const{name, email, password, location} = req.body
//validate
// if(!name){
//     // return res.status(400).send({sucess:false, message:'please provide name'})
//     next("name is required")
// }
// if(!email){
//     // return res.status(400).send({sucess:false, message:'please provide email'})
//     next("email is required")
// }
// if(!password){
//     return res.status(400).send({sucess:false, message:'please provide password'})
// }
const existingUser = await userModel.findOne({email})
if(existingUser){
    return res.status(200).send({
        sucess:false,
        message:'Email is Already Registered Please Login'
    })
}
const user =await userModel.create({name, email, location, password});
//token
const token = user.createJWT()
res.status(201).send({
    sucess: true,
    message: "User Created Sucessfully",
    user:{
        name: user.name,
        lastName: user.lastname,
        email: user.email,
        loaction: user.location
    },
    token
})
}
catch(err){
    console.log(err)
    // res.status(400).send({
    //     message:'Error In Register Controller',
    //     sucess: false,
    //     err,
    // })

    //adding middleware error
    next(err);
}
};



export const loginController = async (req, res)=>{
const {email, password} =req.body
if(!email ||!password){
    next('please prove all fields')
}
const user = await userModel.findOne({email})
if(!user){
    next('Invalid Username or password')
}
const isMatch = await user.comparePassword(password)
if(!isMatch){
    next('Invaild username or Password')
}
const token = user.createJWT()
res.status(200).json({
    sucess:'Login Sucessfully',
    user:{
        name: user.name,
        lastName: user.lastname,
        email: user.email,
        loaction: user.location
    },
    token
})
}