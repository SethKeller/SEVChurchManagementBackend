module.exports = app => {
    const addresses = require("../controllers/address.js");
  
    var router = require("express").Router();
  
    // Create a new Addresses
    
    router.post("/", addresses.create);
    //Retrieve all Addresses
    router.get("/", addresses.findAll);
   
    // Retrieve a single Address with id
    router.get("/:id", addresses.findOne);
  
    // Update a Address with id
    router.put("/:id", addresses.update);
  
    // Delete a Address with id
    router.delete("/:id", addresses.delete);
  
  
    app.use('/api/addresses', router);
  };