const contactSchemaModel = require('../models/contactSchema')

// @desc: get all contacts from the database
// @route: /contacs/getContacts
// @access: public
const getContacts = async (req, res) => {

    res.status(200).json({msg: "In the getContacts in the controller"})

}

const createContact = async (req, res, next) => {

    try{

        const {name, phone, email} = req.body

        if (!name || !phone || !email){
            res.status(400)
            throw new Error("All fields are necessary")
        }

        console.log(req.body)
        const a = await contactSchemaModel.create(
            req.body
        )
        console.log(a)
        
        res.status(200).json({msg: "In the createContact in the controller", documentCreated: a})



    }
    catch(err){
        // this will invoke the errorHandlerMiddleware
        next(err)
    }
    

}

module.exports = {
    getContacts,
    createContact
}


//git commit -m "Add contact to mongoDB provided as a json in the body at /contact/ createContact api endpoint "          
