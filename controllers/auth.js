const db = require("../models");
const config = require("../config/auth.config");
const nodemailer = require("nodemailer"); 
const Person = db.persons;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Create a Person
  let person = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    DisplayName:  req.body.DisplayName,
    Picture: req.body.Picture,
    DateofBirth: req.body.DateofBirth,
    Phone: req.body.Phone,
    Email: req.body.Email,
    HousePhone: req.body.HousePhone,
    Password: bcrypt.hashSync(req.body.Password, 8),
    FamilyId: req.body.FamilyId,
    CongregationId: req.body.CongregationId,
    EventId : req.body.EventId,
    FamilyRole : req.body.FamilyRole
  };
  let plainPass = req.body.Password;

  person = this.setPlaceholderPicture(person); // Set placeholder picture if nonexistent

  Person.create(person)
    .then(person => {
      if (req.body.Roles) {
        Role.findAll({
          where: {
            Name: {
              [Op.or]: req.body.Roles
            }
          }
        }).then(roles => {
          person.setRoles(roles).then(() => {
            sendMail(person, plainPass);
            res.send({ message: `${person.FirstName} ${person.LastName} was registered successfully!`, person });
          });
        });
      } else {
        // person role = 1
        person.setRoles([1]).then(() => {
          res.send({ message: `${person.FirstName} ${person.LastName} was registered successfully!`, person });
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

// Set a placeholder picture for a person (used if no picture has been added)
exports.setPlaceholderPicture = (person) => {
  if (person.Picture == null || person.Picture == undefined) {
      person.Picture = "/pictures/member/default.png";
      // Old placeholders:
      // (male) "https://qph.fs.quoracdn.net/main-thumb-247285578-200-hzqdjetzezpphiwkjnrnsynmdtylybjy.jpeg"
      // (female) "https://images.squarespace-cdn.com/content/v1/588921712e69cfac18fe17a2/1510150601760-T6D3J73PH8NMMQMYXLIS/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/Jolie_020+Square.jpg";
  }
  return person;
};

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(person, password) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    auth: {
      user: "church12315@gmail.com", // generated ethereal user
      pass: "eNAikwvJtKeai7", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Wilshire Church of Christ" <church12315@gmail.com>', // sender address
    to: person.Email, // list of receivers
    subject: "Your new login information!", // Subject line
    html: `<p>Email: ${person.Email}</p> <p>Password: ${password}`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
