const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./Dbs/userDb')
const Admin = require('./Dbs/adminDb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const Application = require('./Dbs/userDb')
const Slot = require('./Dbs/adminDb')
require('dotenv').config()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/incubation')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, 'companyLogo.jpg')
  },
})
let upload = multer({ storage: storage }).single('logo')

app.post('/signup', async (req, res) => {
  console.log('signup body', req.body)
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    await User.UserDb.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', err })
  }
})
app.post('/login', async (req, res) => {
  console.log('signup body', req.body)
  try {
    const user = await User.UserDb.findOne({
      email: req.body.email,
    })

    if (user) {
      const verifyuser = bcrypt.compare(req.body.password, user.password)
      if (verifyuser) {
        const token = jwt.sign(
          {
            
          },
          process.env.user_secret,
          { expiresIn: 60 * 60 },
        )
        return res.json({ status: 'ok', user: token })
      } else {
        return res.json({ status: 'error' })
      }
    } else {
      return res.json({ status: 'error' })
    }
  } catch (err) {
    res.json({ status: 'error', err })
  }
})

app.post('/home', async (req, res) => {
  try {
    upload(req, res, (err) => {
      let formData = JSON.parse(req.body.data)
      console.table(formData)
      formData.status = 'new'
      Application.ApplicationDb.create(formData).then((response) => {
        const currentPath = path.join(__dirname, './public', 'companyLogo.jpg')
        const destinationPath = path.join(
          __dirname,
          './public/companylogos',
          response.id + '.jpg',
        )

        fs.rename(currentPath, destinationPath, function (err) {
          if (err) {
            throw err
          } else {
            console.log('Successfully moved the file!')
          }
        })
        res.status(200).json({ success: 'form submitted successfully' })
      })

      if (err instanceof multer.MulterError) {
        return res.status(500).json({ err: 'qwerty' })
      } else if (err) {
        return res.status(500).json({ err: 'asdfgh' })
      }
    })
  } catch (error) {
    console.log(error)
  }
})

/* ADMIN */
const checkadmin = (req,res,next)=>{
  const adminToken = req.headers.authtoken

  console.log(adminToken);
  if(adminToken){
    const auth = jwt.verify(adminToken,process.env.admin_secret)
    console.log(auth);
    if(auth){
      console.log("admin logged");
      next()
    }else{
      res.json({status:false})
    }
  }
}  

app.post('/adminlogin', async (req, res) => {
  try {
    const admin = await Admin.AdminDb.findOne({
      email: req.body.email,
    })
    if (admin) {
      const verifyadmin = bcrypt.compare(req.body.password, admin.password)
      if (verifyadmin) {
        const adminToken = jwt.sign({},process.env.admin_secret, {
          expiresIn: 60 * 60,
        })
       
        return res.json({ status: 'ok', admin: adminToken })
      } else {
        return res.json({ status: 'error' })
      }
    } else {
      return res.json({ status: 'user does not exist' })
    }
  } catch (err) {
    res.json({ status: 'error', err })
  }
})
app.get('/newapplication', async (req, res) => {
  try {
    const application = await Application.ApplicationDb.find({})

    res.json({ status: 'ok', application })
  } catch (err) {
    res.json({ status: 'error' })
  }
})
app.get('/openapp', async (req, res) => {
  try {
    const data = await Application.ApplicationDb.findOne({ _id: req.query.id })

    res.json({ status: 'ok', data })
  } catch (err) {
    res.json({ err: 'error' })
  }
})
app.get('/pending', async (req, res) => {
  console.log(req.query)
  try {
    const data = await Application.ApplicationDb.updateOne(
      { _id: req.query.id },
      {
        $set: {
          status: 'pending',
        },
      },
    )
  
    res.json({ status: true })
  } catch (err) {
    console.log(err)
    res.json({ err: 'error' })
  }
})
app.get('/approve', async (req, res) => {
  try {
    const data = await Application.ApplicationDb.updateOne(
      { _id: req.query.id },
      {
        $set: {
          status: 'approved',
        },
      },
    )

    res.json({ status: true })
  } catch (err) {
    res.json({ err: 'error' })
  }
})
app.get('/decline', async (req, res) => {
  console.log(req.query)
  try {
    const data = await Application.ApplicationDb.updateOne(
      { _id: req.query.id },
      {
        $set: {
          status: 'decline',
        },
      },
    )

    res.json({ status: true })
  } catch (err) {
    res.json({ err: 'error' })
  }
})
app.get('/slot', async (req, res) => {
  try {
    const data = await Slot.SlotDb.find({})
    res.json(data)
  } catch (err) {
    res.json(err)
  }
})
app.post('/sloted', (req, res) => {
  const id = req.body._id
  const companyId = req.body.company
  try {
    Slot.SlotDb.updateOne(
      { _id: id },
      {
        $set: {
          selected: true,
        },
      },
    ).then((response) => {
      Application.ApplicationDb.updateOne(
        { _id: companyId },
        {
          $set: {
            selected: true,
          },
        },
      ).then((response) => {})
    })

    res.json({ status: true })
  } catch (err) {
    res.json({ err: 'error' })
  }
})
const auth = (req,res,next)=>{
  const token = req.body.token;
 
  // If the token is present
  if (token) {
 
    // Verify the token using jwt.verify method
    const decode = jwt.verify(token, "secret");
 
    //  Return response with decode data
    res.json({
      login: true,
      data: decode,
    });
  } else {
 
    // Return response with error
    res.json({
      login: false,
      data: "error",
    });
  }
  next()
}
app.listen(3005, () => {
  console.log('server started at port 3001')
})
