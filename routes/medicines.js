const express= require('express')
const router = express.Router()
const medicine = require('../models/medicine')
const {ensureAuth} = require('../middleware/auth')

// show add page
router.get('/add',ensureAuth,(req,res)=>{
    res.render('pages/addmed')
})
// process add page
router.post('/', ensureAuth, async (req, res) => {
    try {
      req.body.user = req.user.id
      await medicine.create(req.body)
      res.redirect('/dashboard')
    } catch (err) {
      console.error(err)
      
    }
  })

module.exports=router