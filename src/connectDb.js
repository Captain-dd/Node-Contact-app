const mongoose = require("mongoose")

const connectDb = async () => {
    try{

        const uri = process.env.CONNECTION_STRING

        console.log(uri)

        const connect = await mongoose.connect(uri)

        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
          );

    }catch(err){

        

        console.log(err)


    }
    
}

module.exports = connectDb
