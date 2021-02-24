const db = require("../models");
const Congregation = db.congregations;
const Room = db.rooms;

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Congregation
    const room = {
        Name: req.body.Name,
        Number: req.body.Number,
        CongregationId: req.body.CongregationId
    };

    // Save Congregation in the database
    Room.create(room)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Room."
            });
        });
};
exports.findAll = (req, res) => {
    Room.findAll({include: [ "congregations"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving rooms ."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Room.findByPk(id,{include: [ "congregations"] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving room with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Room.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "romm was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Room with id=${id}. Maybe Student was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Room with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Room.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Student was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Student with id=${id}. Maybe Student was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Student with id=" + id
            });
        });
};
