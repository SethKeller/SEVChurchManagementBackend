module.exports = app => {
    const familys = require("../controllers/family.js");
  
    var router = require("express").Router();
  
    // Create a new Family
    router.post("/", familys.create);
    
    //Retrieve all Family
    router.get("/", familys.findAll);
   
    // Retrieve a single Family with id
    router.get("/:id", familys.findOne);
  
    // Update a Family with id
    router.put("/:id", familys.update);
  
    // Delete a Family with id
    router.delete("/:id", familys.delete);
    
    // Upload a new picture for a Family
    router.post("/:id/picture", familys.updatePicture);
    
    app.use('/api/familys', router);
};