const db = require("../models");
const Group = db.groups;


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a groups
    const group = {
        Name : req.body.Name,
        Type: req.body.Type,
        CongregationId:req.body.CongregationId
       

    };

    // Save Groups in the database
    Group.create(group)
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
    Group.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving gropus."
            });
        });
  };
  exports.findOne = (req, res) => {
    const id = req.params.id;

    Group.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving a group with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Group.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Groups was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Groups with id=${id}. Maybe Groups was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Group with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Group.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "groups was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete group with id=${id}. Maybe Group was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Groups with id=" + id
            });
        });
};