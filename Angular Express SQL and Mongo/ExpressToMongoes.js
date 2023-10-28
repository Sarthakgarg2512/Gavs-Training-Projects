const express = require('express');
const dot=require('dotenv')
const mon=require('mongoose')
const bparser = require('body-parser');
bparseinit=bparser.urlencoded({extended:false});

// to initialise the express
const app=express();
dot.config();
mon.connect("mongodb://127.0.0.1:27017/local?directConnection=true&serverSelectionTimeoutMS=2000&appName=ExpresstoMongo").then(
    ()=>{console.log('Connection Established Successully......')}).catch(
    ()=>{console.log('Unable to connect. Check the String')}
)

// Define the schema for the user collection
const userSchema = new mongoose.Schema({
  userid: String,
  password: String,
  emailid: String,
});

// Create a model based on the schema
const UserData = mongoose.model('User', userSchema);

// Get all users
function getAllUsers(req, res) {
  UserData.find().then((data) => {
    console.log(data);
    res.send(data);
  }).catch((error) => {
    console.log(error);
    res.send('Could not fetch the data');
  });
}

app.get('/allUsers', getAllUsers);

// Add a new user
function addNewUser(req, res) {
  const udata = new UserData({
    userid: req.body.userid,
    password: req.body.password,
    emailid: req.body.emailid,
  });
  udata.save()
    .then(() => {
      console.log('User Inserted Successfully');
      res.send('User Inserted Successfully');
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Unable to insert the data');
    });
}

app.post('/addUser', addNewUser);

// Delete a user by userid
function deleteTheUser(req, res) {
  const userid = req.body.userid;

  UserData.findOneAndDelete({ 'userid': userid }).then((user) => {
    if (user) {
      console.log('User Deleted Successfully');
      res.send('User Deleted Successfully');
    } else {
      console.log('User not Deleted');
      res.send('User not Deleted');
    }
  });
}

app.delete('/delete', deleteTheUser);

// Update a user by userid
function updateTheUser(req, res) {
  const userid = req.body.userid;
  const updateUserData = {
    password: req.body.password,
    emailid: req.body.emailid,
  };

  UserData.findOneAndUpdate({ 'userid': userid }, updateUserData, { new: true }).then((user) => {
    if (user) {
      console.log('User Updated Successfully');
      res.send('User Updated Successfully');
    } else {
      console.log('User not updated');
      res.send('User not updated');
    }
  });
}

app.put('/update', updateTheUser);

app.listen(8001, (error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log('Connected to http://localhost:8001');
  }
});
