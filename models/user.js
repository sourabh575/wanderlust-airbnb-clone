const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PassportLocalMoongose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type:String,
        require:true
    }
});
userSchema.plugin(PassportLocalMoongose);

module.exports = mongoose.model("user",userSchema);
