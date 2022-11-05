const express= require('express')
const router = express.Router()
const {ensureAuth,ensureGuest} = require('../middleware/auth')
router.get('/',ensureGuest,(req,res)=>{
    res.render('pages/landing')
})
router.get('/login',ensureGuest,(req,res)=>{
    res.render('pages/login')
})
router.get('/dashboard',ensureAuth,(req,res)=>{
    res.render('pages/dashboard',{
        name:req.user.firstName
    });
});
module.exports=router