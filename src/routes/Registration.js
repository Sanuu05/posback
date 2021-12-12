const express = require('express')
const route = express.Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

route.get('/', (req,res)=>{
    res.json('heloo from registration page')
})
route.post('/signup',async(req,res)=>{
    try {
        const {name,email,password,cpassword,mobile,uid} = req.body
        if(name && email){
            const exuser = await User.findOne({"email":email})
            // console.log('ccc',exuser)
            if(!exuser){
                const userdata = new User({
                    name,
                    email,
                    uid

                })
                const savedata = await userdata.save()
                res.json("SignUp sucesfully")
                

            }else{
                res.status(400).json('Existing User')
            }


        }else{
            res.status(400).json('Fill all the fields')
        }
        
    } catch (error) {
        console.log('error',error)
    }
})
route.post('/login',async(req,res)=>{
    try {
        const {email,password} = req.body
        if(email && password){
        const exuser = await User.findOne({"email":email})
        if(exuser){
            const passveri = await bcrypt.compare(password, exuser.password)
            if(passveri){
                if(exuser?.approve){
                const token = await jwt.sign({ id: exuser._id }, "sdksjkdsadnnasmdnandasdnmsandmnsamd")
                res.json({
                    token,
                    msg:'Login Sucessfull'
                })
            }else{
                res.status(400).json('You are not approve by the admin')
            }

            }else{
                res.status(400).json('Check all the details')

            }

        }else{
            res.status(400).json('User Not registered')
        }
    }else{
        res.status(400).json('fill all fields')
    }
        
    } catch (error) {
        console.log('error')
        
    }
})
route.get('/getuser/:id',async(req,res)=>{
    try {
        console.log('hello')
        console.log(req.params)
        // console.log('hello')
        const finduser = await User.findOne({"uid":req.params.id})
        // console.log(finduser)
        res.json(finduser)
    } catch (error) {
        consol.log('error')
    }
})
route.get('/getalluser',async(req,res)=>{
    try {
        const alluser = await User.find()
        res.json(alluser)
    } catch (error) {
        
    }
})
route.patch('/permission', auth, async(req,res)=>{
    try {
        const find = await User.findById(req.user)
        if(find?.role==="admin"){
            // console.log("aaass",req.body)
            const update = await User.findByIdAndUpdate(req.body?.id,req.body?.data)
            res.json('Employee permission upadted')

        }else{
            res.status(400).json("You are not authorised")
        }
        
    } catch (error) {
        console.log('error')
    }
})







module.exports = route