module.exports = app => {
    const persons = require("../controllers/person.js");
  
    var router = require("express").Router();
  
    // Create a new Person
    router.post("/", persons.create);
    
    // Retrieve all Persons
    router.get("/", persons.findAll);
   
    // Retrieve a single Person with id
    router.get("/:id", persons.findOne);
  
    // Update a Person with id
    router.put("/:id", persons.update);
  
    // Delete a Person with id
    router.delete("/:id", persons.delete);
    
    // Upload a new picture for a Person
    router.post("/:id/picture", persons.updatePicture);
  
    app.use('/api/persons', router);
  };