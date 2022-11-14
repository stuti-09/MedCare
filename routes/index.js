const express= require('express')
const router = express.Router()
const medicine = require('../models/medicine')
const {ensureAuth,ensureGuest} = require('../middleware/auth')
router.get('/',ensureGuest,(req,res)=>{
    res.render('pages/landing')
})
router.get('/login',ensureGuest,(req,res)=>{
    res.render('pages/login')
})
router.get('/dashboard',ensureAuth,(req,res)=>{
    medicine.find({user:req.user.id})
    .then(medicines=>{
        res.render('pages/dashboard',{
           medicines,
           name:req.user.firstName 
        })
    })
    .catch(error=>{
        res.status(500).send({ message: error.message || "Error occured"});
    })
    
    
});
module.exports=router