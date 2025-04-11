import mongoose from "mongoose";

// create mongoose schema
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    // to store files, videos, images, we should use 3rd party storage such as: (AWS s3, cloudinary),database would not be the correct place, but for this task i am storing here. 

    image:{
        type:String,
        default:"https://www.gravatar.com/avatar/?d=mp"
    }


});

// using schema create model
const User = mongoose.model("User",userSchema);

// export model
export default User;








