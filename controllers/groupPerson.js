const db = require("../models");
const GroupPerson = db.groupPersons;


exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a GroupPersons
    const groupPerson = {
        Leader: req.body.Leader,
        personId: req.body.PersonId,
        GroupId: req.body.GroupId
    };

    // Save GroupPersons in the database
    GroupPerson.create(groupPerson)
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
    GroupPerson.findAll( {include: [ "people","groups" ]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving group person."
            });
        });
  };
  exports.findOne = (req, res) => {
    const id = req.params.id;
 
    GroupPerson.findByPk(id, {include: [ "people","groups" ]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving a GroupPerson with id=" + id
            });
        });
};
exports.findByPersonId = (req, res) => {
    const personId = req.params.id;
    GroupPerson.findAll({
        where: {
            PersonId: personId,
            
        }, include: [ "groups" ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Addresses ."
        });
    });
};
exports.findByGroupId = (req, res) => {
    const groupId = req.params.id;
    GroupPerson.findAll({
        where: {
            GroupId: groupId,
            
        }, include: [ "people" ]
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving the group person ."
        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    GroupPerson.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "GroupPersons was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update GroupPersons with id=${id}. Maybe GroupPersons was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating GroupPerson with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    GroupPerson.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "GroupPersons was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete GroupPerson with id=${id}. Maybe GroupPerson was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete GroupPersons with id=" + id
            });
        });
};