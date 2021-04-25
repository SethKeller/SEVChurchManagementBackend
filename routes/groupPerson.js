module.exports = app => {
    const groupPersons = require("../controllers/groupPerson");
  
    var router = require("express").Router();
  
    // Create a new Congregations
    
    router.post("/", groupPersons.create);
   // Retrieve all Event
    router.get("/", groupPersons.findAll);
   
    // Retrieve a single Event with id
    router.get("/:id", groupPersons.findOne);
    router.get("/personId/:id", groupPersons.findByPersonId)
    
    router.get("/groupId/:id",groupPersons.findByGroupId)
  
    // Update a Event with id
    router.put("/:id", groupPersons.update);
  
    // Delete a Event with id
    router.delete("/:id", groupPersons.delete);
  
  
    app.use('/api/groupPersons', router);
  };