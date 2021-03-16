const db = require("../models");
const Person = db.persons;
const Role = db.role;

checkDuplicateEmail = (req, res, next) => {
  // Username
  Person.findOne({
    where: {
      Email: req.body.Email
    }
  }).then(person => {
    if (person) {
      res.status(400).send({
        message: "Failed! email is already in use!"
      });
      return;
    }

    next();
  });
};

checkRolesExisted = (req, res, next) => {
  let ROLES = [];
  Role.findAll()
    .then(data => {
      ROLES = data.map(d => d.Name);
    })
    .then(() => {
      if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
          if (!ROLES.includes(req.body.roles[i])) {
            res.status(400).send({
              message: "Failed! Role does not exist = " + req.body.roles[i]
            });
            return;
          }
        }
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving roles"
      })
    })

  next();
};

const verifySignUp = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;