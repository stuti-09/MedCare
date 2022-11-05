const express= require('express')
const passport=require('passport')
const router = express.Router()
//auth with google
router.get('/google',
passport.authenticate('google',{scope:['profile']}));
//goggle auth callback
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/dashboard')
    }
  );
  //logout
  router.get('/logout', (req, res, next) => {
    req.logout((error) => {
        if (error) {return next(error)}
        res.redirect('/')
    })
  })
module.exports=router