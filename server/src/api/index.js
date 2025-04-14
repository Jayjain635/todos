const express = require('express');

const apiRoutes = express.Router();
apiRoutes.use('/user',require('./routes/auth'))
apiRoutes.use('/todo',require('./routes/todo'))

module.exports = apiRoutes;
     