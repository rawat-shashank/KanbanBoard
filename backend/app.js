const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');

// DB connection test
db.authenticate()
  .then( () => console.log('DB Connected'))
  .catch(err => console.log(err))

// Express setup
const app = express();
app.use(bodyParser.json());

// API Header for CORS
app.use( (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-with, Content-Type, Accept, Authorization");
	res.setHeader('Access-Control-Allow-Methods', "GET, POST, PATCH, PUT, DELETE, OPTIONS");
	next();
});

// Express routes
app.use("/user",userRoutes);
app.use("/tasks",taskRoutes);

module.exports = app;