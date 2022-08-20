const mongoose = require('mongoose')
const User = new mongoose.Schema({
    name:{type:String , require:true},
    email:{type:String , require:true , unique:true},
    password:{type:String , require:true},
},{collection:"users"})

const Application = new mongoose.Schema({
    name:{type:String , require:true},
    address:{type:String , require:true},
    email:{type:String , require:true , unique:true},
    mobile:{type:Number , require:true},
    city:{type:String , require:true},
    state:{type:String , require:true},
    companyName:{type:String , require:true},
    teamandbackground:{type:String , require:true},
    companyandproduct:{type:String , require:true},
    problem:{type:String , require:true},
    incubationtype:{type:String , require:true } ,
    status:{type:String , require:true},
    selected:{type:Boolean , require:true}
},{collection:"application"}) 

const UserDb = mongoose.model('user', User)
const ApplicationDb = mongoose.model('application', Application)
module.exports={
    UserDb,ApplicationDb
}