const mongoose = require('mongoose')
const validator = require('validator')
// const autoIncrement = require('mongoose-auto-increment')

const employeeSchema = mongoose.Schema({
  id: { type: Number },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  user: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email id already present'],
    validate (value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email')
      }
    }
  },
  phone: { type: Number, required: true },
  gender: { type: String, required: true, default: 'Woman' },
  dob: { type: Date, required: true },
  city: { type: String, required: true },
  states: { type: String, required: true },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 15,
    minLowercase: 1,
    minUppercase: 1,
    minNumber: 1
  },
  tnc: { type: Boolean },
  isActive: { type: Boolean, default: true }
})

const TemplateAPI = mongoose.model('TemplateAPI', employeeSchema)
module.exports = TemplateAPI
