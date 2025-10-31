import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        
        await mongoose.connect(process.env.MONGO_URI,
            {
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        );
        console.log("Connected To MongoDB Successfuly")

    }catch(error){
        console.error("MongoDB Connection is Failed",error.message);
        process.exit(1);
    }
}
export default connectDB;