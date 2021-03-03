module.exports = app => {
  const persons = require("../controllers/person.js");

  var router = require("express").Router();

  // Retrieve all Persons with name 
  router.get("/person", persons.search);

  app.use('/api/search', router);
};