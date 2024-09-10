import mongoose from "mongoose"

  const  connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.Mongo_Url)
        console.log(`connect to Mongodb database ${conn.connection.host}`)


        
    } catch (error) {
        console.log("Error".bgRed);
        
    }
}
export default connectDB;