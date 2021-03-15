const db = require("../models");
const config = require("../config/auth.config");
const Person = db.persons;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save Person to Database
  Person.create({
    Email: req.body.Email,
    Password: bcrypt.hashSync(req.body.Password, 8)
  })
    .then(person => {
      if (req.body.Roles) {
        
        console.log("req.body.Roles: " + req.body.Roles);
        Role.findAll({
          where: {
            Name: {
              [Op.or]: req.body.Roles
            }
          }
        }).then(roles => {
          person.setRoles(roles).then(() => {
            res.send({ message: "Person was registered successfully!" });
          });
        });
      } else {
        // person role = 1
        person.setRoles([1]).then(() => {
          res.send({ message: "Person was registered successfully! (default)" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Person.findOne({
    where: {
      Email: req.body.Email
    }
  })
    .then(person => {
      if (!person) {
        return res.status(404).send({ message: "Person Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.Password,
        person.Password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: person.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      person.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].Name.toUpperCase());
        }
        res.status(200).send({
          id: person.id,
          email: person.Email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};