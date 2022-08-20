const mongoose = require('mongoose')
const Admin = new mongoose.Schema({
    name:{type:String , require:true},
    email:{type:String , require:true , unique:true},
    password:{type:String , require:true},
},{collection:"admin"})
const Slot = new mongoose.Schema({
   section:{type:String , require:true},
   selected:{type:Boolean , require:true}

},{collection:"slot"})


const AdminDb = mongoose.model('admin', Admin)
const SlotDb = mongoose.model('slot', Slot)
module.exports={
    AdminDb,SlotDb
}