module.exports = app => {
    const groups = require("../controllers/group.js");
  
    var router = require("express").Router();
  
    // Create a new Congregations
    
    router.post("/", groups.create);
   // Retrieve all Event
    router.get("/", groups.findAll);
   
    // Retrieve a single Event with id
    router.get("/:id", groups.findOne);
  
    // Update a Event with id
    router.put("/:id", groups.update);
  
    // Delete a Event with id
    router.delete("/:id", groups.delete);
  
  
    app.use('/api/groups', router);
  };