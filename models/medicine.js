const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim:true
  },
  time: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default:'not taken',
    enum:['taken','not taken']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('medicine', medicineSchema)