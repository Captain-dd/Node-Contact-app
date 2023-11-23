const express = require("express")
const dotenv  = require("dotenv").config()

const connectDB = require("./src/connectDb")

const contactsRoute = require("./routes/contactRoutes")

const errorHandler= require('./middleware/errorHandler')

PORT = process.env.PORT || 5001


connectDB()

// defining the express app
app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({msg:"API started"})
})



//route middleware for /contact path
app.use('/contact', contactsRoute)

app.use(errorHandler)




app.listen(PORT, () => {
    console.log(`Servert startede and listeining on the port ${PORT}`)
})
 
// captain-dd-API



