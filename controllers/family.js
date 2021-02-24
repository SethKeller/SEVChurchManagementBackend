const db = require("../models");
const Family = db.familys;
const Addres =db.addresses;


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a family
    const family = {
        FamilyName : req.body.FamilyName,
        CongregationId: req.body.CongregationId,
       

    };

    // Save family in the database
    Family.create(family)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the family."
            });
        });
};
exports.findAll = (req, res) => {
    Family.findAll({include: [ "congregations"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving family ."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Family.findByPk(id,{include: [ "congregations"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving family with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Family.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "was ufamily pdated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Family with id=${id}. Maybe Family was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Family with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Family.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Family was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Family with id=${id}. Maybe Family was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Family with id=" + id
            });
        });
};
