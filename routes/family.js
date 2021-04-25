module.exports = app => {
    const familys = require("../controllers/family.js");
  
    var router = require("express").Router();
  
    // Create a new Familt
    
    router.post("/", familys.create);
    //Retrieve all Family
    router.get("/", familys.findAll);
    router.get("/personId/:id", familys.findByPersonId);
    // Retrieve a single Family with id
    router.get("/:id", familys.findOne);
  
    // Update a Family with id
    router.put("/:id", familys.update);
  
    // Delete a Family with id
    router.delete("/:id", familys.delete);
  
  
    app.use('/api/familys', router);
  };