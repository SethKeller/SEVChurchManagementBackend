const db = require("../models");
const Congregation = db.congregations;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Congregation
    const congregation = {
        Name: req.body.Name,
        Address: req.body.Address,
        Phone: req.body.Phone
    };

    // Save Congregation in the database
    Congregation.create(congregation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Congregation."
            });
        });
};

exports.findAll = (req, res) => {
  Congregation.findAll()
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message:
                  err.message || "Some error occurred while retrieving Congregation."
          });
      });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Congregation.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Congregation with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Congregation.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Congregation was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Congregation with id=${id}. Maybe Congregation was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Congregation with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Congregation.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Congregation was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Congregation with id=${id}. Maybe Congregation was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Congregation with id=" + id
            });
        });
};
