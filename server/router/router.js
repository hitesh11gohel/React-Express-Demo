// init code
const express = require('express')
const router = express.Router()
const controller = require('../controller/UserController')
const { check } = require('express-validator')
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

// create route
router.get('/register', controller.getData)
router.get('/register/:_id', controller.getDataById)
router.post(
  '/register',
  [
    check('fname')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('lname')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('user')
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check('email')
      .isEmail()
      .normalizeEmail(),
    check('password')
      .not()
      .isEmpty()
      .trim()
      .escape()
  ],
  controller.postData
)
router.put('/register/:_id', controller.putData)
router.delete('/register/:_id', controller.deleteUser)

router.get('/email/:email', controller.getemail)
router.get('/user/:user', controller.getuser)

router.post('/login', controller.login)

// state
router.get('/state', controller.getState)
router.post('/state', controller.poststate)
router.get('/state/:lable', controller.getStatebystateName)

// city
router.get('/city/:state', controller.getCityByState)
router.post('/city', controller.postCity)
router.get('/city', controller.getCity)

// pagination, sorting and filtering

router.get('/registerFSP', controller.getDataByFSP)
router.get('/registerSearch/:string', controller.SearchData)
// router.get("/register/fsp", controller.getDataByFSP);

// exports modules
module.exports = router
