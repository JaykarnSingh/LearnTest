const asyncHandler=require("express-async-handler");
const User=require('../Models/userModel');
const generateToken=require("../config/generateToken");
//fyfyufyu
const { Error } = require("mongoose");
const registerUser=asyncHandler(async(req,res)=>{
   const {name,email,password,pic}= req.body;
   if(!name || !email || !password){
    res.status(400);
    throw new Error("Please Enter All The Feilds");
   }
   const userExists=await User.findOne({email});

   if(userExists){
    resizeBy.status(400);
    throw new Error("User already exists");
   }
// /sjkdsjkfvsi
   const user=await User.create({
    name,
    email,
    password,
    pic,
   })

   if(user){
    res.status(200).json({
        _id:user._id,
        nmae:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id),
    })
   }else{
    res.status(400);
    throw new Error('Invalid Request')
   }
});

const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user= await User.findOne({email});
    
    if(user && (await user.matchPassword(password))){
        
        res.json({
            _id:user._id,
        nmae:user.name,
        email:user.email,
        pic:user.pic,
        token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error('Invalid Request')
       }
})

module.exports={
    registerUser,
    authUser
};