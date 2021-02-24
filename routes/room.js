module.exports = app => {
    const rooms = require("../controllers/room.js");
  
    var router = require("express").Router();
  
    // Create a new Room
    
    router.post("/", rooms.create);
    // Retrieve all Rooms
    router.get("/", rooms.findAll);
   
    // Retrieve a single Room with id
    router.get("/:id", rooms.findOne);
  
    // Update a Room with id
    router.put("/:id", rooms.update);
  
    // Delete a Room with id
    router.delete("/:id", rooms.delete);
  
  
    app.use('/api/rooms', router);
  };