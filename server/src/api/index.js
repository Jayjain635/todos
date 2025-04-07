const express = require('express');
const apiRoutes = express.Router();

apiRoutes.use('/user',require('./routes/auth'))

module.exports = apiRoutes;
