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
    const person = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        DisplayName:  req.body.DisplayName,
        DateofBirth: req.body.DateofBirth,
        Email: req.body.Email,
        HousePhone: req.body.HousePhone,
        Password: req.body.Password,
        FamilyId: req.body.FamilyId,
        CongregationId: req.body.CongregationId,
        EventId : req.body.EventId,
        FamilyRole : req.body.FamilyRole


    };

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
exports.search = (req, res) => {
  
  console.log(req.query);
  let queryArr = req.query['q'].split(" "); 

  Person.findAll({
    where: {
      [Op.or]: [
        { FirstName: {[Op.substring]: queryArr[0]} },
        { FirstName: {[Op.substring]: queryArr[1]} },
        { LastName: {[Op.substring]: queryArr[0]} },
        { LastName: {[Op.substring]: queryArr[1]} },
        { email: {[Op.substring]: queryArr[0]} },
        { phone: {[Op.substring]: queryArr[0]} },
      ]
    }})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occured when search."
    })
  })
};