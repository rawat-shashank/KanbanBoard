const Task = require("../models/Tasks");

exports.getUserAllTasks = (req, res, next) => {
  Task.findAll({
    where: {
      userId: req.userData.userId
    },
    raw: true,
    order: [
      ['id', 'ASC']
  ],
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(404).json({
        message: err
      });
    });
};

exports.createTask = (req, res, next) => {
  return Task.create({
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    userId: req.userData.userId
  }).then(task => {
    if (task) {
      res.send(task);
    } else {
      res.status(400).send("Error in inserting new record");
    }
  });
};

exports.updateTask = (req, res, next) => {
  Task.update(
    {
      title: req.body.title,
      description: req.body.description,
      type: req.body.type
    },
    {
      limit: 1,
      returning: true,
      where: {
        id: req.body.id,
        userId: req.userData.userId
      }
    }
  ).then(([rowsUpdate, [task]]) => {
    if (task) {
      res.send(task);
    } else {
      res.status(400).send("Error in updating record.");
    }
  });
};
