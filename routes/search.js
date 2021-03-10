module.exports = app => {
  const persons = require("../controllers/person.js");

  var router = require("express").Router();

  // Retrieve all Persons with name 
  router.get("/person", persons.searchByAll);

  router.get("/personemail", persons.searchByEmail);

  router.get("/personfamily", persons.searchByFamily);

  app.use('/api/search', router);
};