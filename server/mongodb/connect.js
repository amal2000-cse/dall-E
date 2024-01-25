import mongoose, { mongo } from "mongoose";

const connectDB =(url)=>{
    //this will help us with the search functionality later on
    mongoose.set('strictQuery',true);
    
    mongoose.connect(url).then(()=>console.log('MongoDB connected'))
    .catch((err)=>console.log(err))
}

export default connectDB