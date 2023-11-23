const express = require("express")
const router = express.Router()

const {getContacts, createContact} = require('../controllers/contactControllers')


router.route('/getContacts').get(getContacts)
router.route('/createContact').post(createContact)


module.exports = router
