import mongoose from 'mongoose';
import colors from 'colors';

const connectDb = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.local_database)
        console.log(`Connected to MongoDB ${mongoose.connection.host}`.bgWhite.green)
    }
    catch(err){
        console.log(`MongoDB Error ${err}`.bgRed.white)
    }
}

export default connectDb;