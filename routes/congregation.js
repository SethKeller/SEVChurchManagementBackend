module.exports = app => {
    const congregations = require("../controllers/congregation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Congregations
    
    router.post("/", congregations.create);
    // Retrieve all Congregations
    router.get("/", congregations.findAll);
   
    // Retrieve a single Congregation with id
    router.get("/:id", congregations.findOne);
  
    // Update a Congregation with id
    router.put("/:id", congregations.update);
  
    // Delete a Congregation with id
    router.delete("/:id", congregations.delete);
  
  
    app.use('/api/congregations', router);
  };