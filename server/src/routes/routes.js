const express = require("express")
const promptController = require("../controllers/prompt-controller")

const routes = express.Router()

routes.post('/api/cordel', promptController.createCordel)

module.exports = routes
