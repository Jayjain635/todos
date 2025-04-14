const express = require("express");
const app = express();
const apiRoutes = require('./src/api/index')
const cors = require('cors')
const corsOptions = {
  origin:'http://localhost:5173',
  credentials: true, 
  methods:['GET','POST',"DELETE"]
};
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api',apiRoutes)

app.listen(5000, () => {
  console.log(`Server  running`);
});