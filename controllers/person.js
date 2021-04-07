const { query } = require("express");
const db = require("../models");
const Person = db.persons;
const Congregation = db.congregations;
const Event = db.events;
const Family = db.familys;
const { Op } = require("sequelize");

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Congregation
    var person = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        DisplayName:  req.body.DisplayName,
        Picture: req.body.Picture,
        DateofBirth: req.body.DateofBirth,
        Phone: req.body.Phone,
        Email: req.body.Email,
        HousePhone: req.body.HousePhone,
        Password: req.body.Password,
        FamilyId: req.body.FamilyId,
        CongregationId: req.body.CongregationId,
        EventId : req.body.EventId,
        FamilyRole : req.body.FamilyRole

    };
    person = this.setPlaceholderPicture(person); // Set placeholder picture if nonexistent

    // Save Congregation in the database
    Person.create(person)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Address."
            });
        });
};

exports.findAll = (req, res) => {
    Person.findAll({include: [ "congregations","familys", "events"] })
        .then(data => {
            data.forEach(person => {
                person = this.setPlaceholderPicture(person); // Set placeholder picture if nonexistent
            });
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving People ."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Person.findByPk(id,{include: [ "congregations","familys", "events"]  })
        .then(data => {
            data = this.setPlaceholderPicture(data); // Set placeholder picture if nonexistent
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving person with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;
    
    req.body = this.setPlaceholderPicture(req.body); // Set placeholder picture if nonexistent
    
    Person.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Person was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Person with id=${id}. Maybe person was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Person with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Person.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Person was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Person  with id=${id}. Maybe Person was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Person with id=" + id
            });
        });
};

exports.searchByAll = (req, res) => {
  
  console.log(req.query);
  let queryStr = req.query['q'];
  let queryArr = queryStr.split(" "); 

  Person.findAll({
    include: "familys",
    where: {
      [Op.or]: [
        { FirstName: {[Op.substring]: queryArr[0]} },
        { FirstName: {[Op.substring]: queryArr[1]} },
        { LastName: {[Op.substring]: queryArr[0]} },
        { LastName: {[Op.substring]: queryArr[1]} },
        { Email: {[Op.substring]: queryStr} },
        { Phone: {[Op.substring]: queryStr} },
        { "$familys.FamilyName$": {[Op.substring]: queryStr} }
      ]
    }})
  .then(data => {
    data.forEach(person => {
        person = this.setPlaceholderPicture(person); // Set placeholder picture if nonexistent
    });
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occured when search."
    })
  })
};

exports.searchByEmail = (req, res) => {
  
  console.log(req.query);
  let queryStr = req.query['q'];

  Person.findAll({
    include: "familys",
    where: {
      email: {[Op.substring]: queryStr} 
    }})
  .then(data => {
    data.forEach(person => {
        person = this.setPlaceholderPicture(person); // Set placeholder picture if nonexistent
    });
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occured when search."
    })
  })
};

exports.searchByFamily = (req, res) => {
  
  console.log(req.query);
  let queryStr = req.query['q'];

  Person.findAll({
    include: "familys",
    where: {
      "$familys.FamilyName$": {[Op.substring]: queryStr} 
    }})
  .then(data => {
    data.forEach(person => {
        person = this.setPlaceholderPicture(person); // Set placeholder picture if nonexistent
    });
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occured when search."
    })
  })
};

// Update the picture for a person
exports.updatePicture = (req, res) => {
    const id = req.params.id;
    
    // Check that there was actually a file in the request
    if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).send('No file was uploaded');
    
    // Set up the file and save path (format: /pictures/member/<id#>.<ext>)
    file = req.files.pictureFile;
    uploadPath = "./pictures/member/" + id + file.name.slice(file.name.lastIndexOf("."));
    
    // Save the file and send back the URL
    file.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);
        
        var savedPath = uploadPath.slice(1);
        
        // Update the person's picture in the database
        Person.update(
          { Picture: savedPath },
          { where: { id: id } }
        )
            .then(result => {}) // Update success
            .catch(err => {
                console.error("Cannot update person " + id + "'s picture:");
                console.error(err);
            });
        
        // Finish up and send back the save path
        console.log("[Picture Upload] Saved '" + file.name + "' to '" + uploadPath + "'");
        res.send(savedPath);
    });
}

// Set a placeholder picture for a person (used if no picture has been added)
exports.setPlaceholderPicture = (person) => {
    if (person.Picture == null || person.Picture == undefined) {
        person.Picture = "/pictures/member/default.png";
        // Old placeholders:
        // (male) "https://qph.fs.quoracdn.net/main-thumb-247285578-200-hzqdjetzezpphiwkjnrnsynmdtylybjy.jpeg"
        // (female) "https://images.squarespace-cdn.com/content/v1/588921712e69cfac18fe17a2/1510150601760-T6D3J73PH8NMMQMYXLIS/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/Jolie_020+Square.jpg";
    }
    return person;
}
