const express = require("express");
const app = express();
const apiRoutes = require('./src/api/index')
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api',apiRoutes)

app.listen(5000, () => {
  console.log(`Server  running`);
});