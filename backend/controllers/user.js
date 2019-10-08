const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then(users => {
      res.status(201).json({
        result: result
      });
    })
    .catch(err => {
      res.status(404).json({
        message: err
      });
    });
};

exports.createUser = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email
    },
    raw: true
  }).then(user => {
    if (user) {
      return res.status(409).json({
        message: "User Already Exists!"
      });
    }
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = {
        email: req.body.email,
        password: hash
      };
  
      const { email, password } = user;
  
      // Insert into table
      User.create({
        email,
        password
      })
        .then(result => {
          res.status(201).json({
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid credentials!"
          });
        });
    });
  })
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({
    where: {
      email: req.body.email
    },
    raw: true
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({});
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({});
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser.id
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h"
        }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser.id
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
};
