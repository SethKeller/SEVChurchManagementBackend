const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// allow uploading and accessing image files
app.use(fileUpload());
app.use('/pictures/member', express.static('pictures/member')); // static file hosting
app.use('/pictures/family', express.static('pictures/family')); // static file hosting

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./routes/congregation.js")(app);
require("./routes/room.js")(app);
require("./routes/address.js")(app);
require("./routes/event.js")(app);
require("./routes/person.js")(app);
require("./routes/family.js")(app);
require("./routes/search.js")(app);
require('./routes/auth')(app);
require('./routes/group.js')(app);
require('./routes/authorize-example')(app);
require('./routes/groupPerson')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");

db.sequelize.sync();

// db.sequelize.sync({ force: true}).then(() => {
//   console.log("Drop and re-sync db.");
// });