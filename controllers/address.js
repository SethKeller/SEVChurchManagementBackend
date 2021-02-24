const db = require("../models");

//const family = db.familys;
const Address = db.addresses;
const Person = db.persons;


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Address
    const address = {
        City : req.body.City,
        HouseNumber: req.body.HouseNumber,
        State: req.body.State,
        Zipcode: req.body.Zipcode,
        Active: req.body.Active,
        PersonId : req.body.PersonId,


    };

    // Save Address in the database
    Address.create(address)
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
    Address.findAll({include: [ "people"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Addresses ."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Address.findByPk(id,{include: [ "people"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Adresses with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Address.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Address was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Address with id=${id}. Maybe Address was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Address with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Address.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Address was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Address with id=${id}. Maybe Address was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Address with id=" + id
            });
        });
};
