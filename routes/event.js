module.exports = app => {
    const events = require("../controllers/event.js");
  
    var router = require("express").Router();
  
    // Create a new Congregations
    
    router.post("/", events.create);
   // Retrieve all Event
    router.get("/", events.findAll);
   
    // Retrieve a single Event with id
    router.get("/:id", events.findOne);
  
    // Update a Event with id
    router.put("/:id", events.update);
  
    // Delete a Event with id
    router.delete("/:id", events.delete);
  
  
    app.use('/api/events', router);
  };