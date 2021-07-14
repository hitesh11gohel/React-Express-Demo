// init code
const UserModel = require('../models/UserModel')
const state_ = require('../models/State_')
const city = require('../models/City')
const { validationResult } = require('express-validator')
const chalk = require('chalk')

// class APIfeatures {
//     constructor(query, queryString) {
//         this.query = query;
//         this.queryString = queryString;
//     }

//     filtering(){
//         const queryObj = {...this.queryString};
//         console.log(queryObj);

//         const excludedFields = ['page', 'sort', 'limit'];
//         excludedFields.forEach(ele => delete queryObj[ele]);

//         let querystr = JSON.stringify(queryObj);
//         querystr = querystr.replace(/\b (gte | gt | lt | lte) \b/g, match => `$${match}`);
//         this.query.find(JSON.parse(querystr));
//         return this;
//     }

//     sorting(){
//         if(this.queryString.sort){
//             const sortBy = this.queryString.sort.split(',').join(' ');
//             this.query = this.query.sort(sortBy)
//         }
//         else{
//             this.query = this.query.sort('-createdAt')
//         }
//         return this;
//     }

//     pagination(){
//         const page = this.queryString.page * 1 || 1;
//         const limit = this.queryString.limit * 1 || 10;
//         const skip = (page - 1) * limit;
//         this.query = this.query.skip(skip).limit(limit);
//         return this;
//     }
// }

// // Show Registered data
// exports.getDataByFSP = async (req, res) => {
//     try{
//         const features = new APIfeatures(UserModel.find(), req.query)
//         .filtering()
//         .sorting()
//         .pagination()
//         const AllData = await features.query;
//         res.status(200).send({
//             status: 'success',
//             result: AllData.length,
//             data: {AllData}
//         });
//     }
//     catch(err){
//         res.status(400).send({
//             status: 'fail',
//             data: ({err})
//     })}
// };

exports.getDataByFSP = async (req, res) => {
  try {
    let { page, rows } = req.query

    if (!page) {
      page = 1
    }
    if (!rows) {
      rows = 10
    }

    const limit = parseInt(rows)
    const skip = (page - 1) * rows
    const count = await UserModel.find().count()
    const users = await UserModel.find()
      .limit(limit)
      .skip(skip)
    const totalPage = Math.ceil(count / rows)

    res.status(200).send({
      page,
      rows,
      totalPage,
      TotalData: count,
      data: users
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
}

// Get All Data
exports.getData = async (req, res) => {
  const countData = await UserModel.find().count()
  await UserModel.find((err, result) => {
    if (err) {
      res.status(400).send(err)
    } else {
      res.status(200).send({ TotalData: countData, data: result })
    }
  }).sort({ id: 1 })
}

// Get data by Id
exports.getDataById = async (req, res) => {
  try {
    const id = req.params._id
    const result = await UserModel.findById(id)
    res.status(200).send(result)

    if (!result) {
      return res.status(404).send()
    } else {
      res.send(result)
    }
  } catch (err) {
    res.status(500).send(err)
  }
}

// Create Register data
exports.postData = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: 'from validation error....',
      errors: errors.array()
    })
  }

  const {
    fname,
    lname,
    user,
    email,
    phone,
    gender,
    dob,
    states,
    tnc,
    city,
    password
  } = req.body
  let id = Math.floor(Math.random() * 100)
  const temp_api = new UserModel({
    fname,
    lname,
    user,
    email,
    phone,
    gender,
    dob,
    states,
    tnc,
    city,
    password,
    id
  })
  try {
    await temp_api.save()
    res.send(req.body)
  } catch (err) {
    console.log(err)
  }
}

// Login using data of registered user
exports.login = async (req, res) => {
  let user = req.body.user
  let password = req.body.password

  await UserModel.findOne({ user, password })
    .then(profile => {
      debugger
      if (profile.password === password) {
        res.status(200).send('User Authenticated')
        console.log(chalk.greenBright.inverse('Login Successful'))
      }
    })
    .catch(err => {
      console.log('Error is :', err.message)
      res.status(401).send('User Unauthorized Access')
      console.log(chalk.redBright.inverse('Incorrect Username or Password'))
    })
}

// Get unique Email
exports.getemail = async (req, res) => {
  let email = req.params.email
  debugger
  console.log(email, 'myemail')
  await UserModel.findOne({ email })
    .then(profile => {
      if (profile.email == email) {
        res.status(422).json({
          status: false
        })
      }
    })
    .catch(err => {
      res.status(200).json({
        status: true
      })
    })
}

// Get unique User
exports.getuser = async (req, res) => {
  let user = req.params.user
  debugger
  await UserModel.findOne({ user })
    .then(profile => {
      if (profile.user == user) {
        res.status(422).json({
          status: false
        })
      }
    })
    .catch(err => {
      res.status(200).json({
        status: true
      })
    })
}

// Get State
exports.getState = async (req, res) => {
  await state_
    .find()
    .then(result => {
      res.json({
        result: result
      })
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
}

// Get State by Name
exports.getStatebystateName = async (req, res) => {
  let lable = req.params.lable
  await state_
    .find({ lable })
    .then(result => {
      res.json({
        result: result
      })
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
}

// Create insert / State
exports.poststate = async (req, res) => {
  const temp_api = new state_(req.body)
  try {
    await temp_api.save()
    res.send(req.body)
  } catch (err) {
    console.log(err)
  }
}

// Create / insert City
exports.postCity = async (req, res) => {
  const CITY = new city(req.body)
  try {
    await CITY.save()
    res.json({
      result: req.body
    })
  } catch (err) {
    console.log(err)
  }
}

// Get city
exports.getCity = async (req, res) => {
  await city
    .find()
    .then(result => {
      res.json({
        result: result
      })
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
}

// Get city By State
exports.getCityByState = async (req, res) => {
  let state = req.params.state
  await city
    .find({ state })
    .then(result => {
      res.json({
        result: result
      })
    })
    .catch(err => {
      res.json({
        error: err
      })
    })
}

//Update / Patch User Data
exports.putData = async (req, res) => {
  try {
    const id = req.params._id
    const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true
    })
    res.status(201).send(updateUser)
    console.log(`Id : ${id} Updated`)
  } catch (err) {
    res.status(401).send(err)
  }
}

// delete User
exports.deleteUser = async (req, res) => {
  try {
    const deleteUserData = await UserModel.findByIdAndDelete(req.params._id)
    if (!req.params._id) {
      return res.status(400).send()
    } else {
      res.status(201).send(deleteUserData)
      console.log(`Id : ${req.params._id} is Successfully Deleted`)
    }
  } catch (err) {
    res.status(401).send(err)
  }
}

exports.SearchData = async (req, res) => {
  const string = new RegExp(req.params.string, 'i')
  await UserModel.find({
    $or: [
      { fname: eval(string) },
      { lname: eval(string) },
      { email: eval(string) },
      { user: eval(string) },
      { gender: eval(string) },
      { states: eval(string) },
      { city: eval(string) }
    ]
  }).then(result => {
    res.json({
      result: result
    })
  })
}
