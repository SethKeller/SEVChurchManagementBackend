const db = require("../models");
const Family = db.familys;


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
                    message: "Family was updated successfully."
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

// Update the picture for a family
exports.updatePicture = (req, res) => {
    const id = req.params.id;
    
    // Check that there was actually a file in the request
    if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).send('No file was uploaded');
    
    // Set up the file and save path (format: /pictures/family/<id#>.<ext>)
    file = req.files.pictureFile;
    uploadPath = "./pictures/family/" + id + file.name.slice(file.name.lastIndexOf("."));
    
    // Save the file and send back the URL
    file.mv(uploadPath, function(err) {
        if (err)
            return res.status(500).send(err);
        
        var savedPath = uploadPath.slice(1);
        
        // Update the family's picture in the database
        Family.update(
          { Picture: savedPath },
          { where: { id: id } }
        )
            .then(result => {}) // Update success
            .catch(err => {
                console.error("Cannot update family " + id + "'s picture:");
                console.error(err);
            });
        
        // Finish up and send back the save path
        console.log("[Picture Upload] Saved '" + file.name + "' to '" + uploadPath + "'");
        res.send(savedPath);
    });
}

// Set a placeholder picture for a family (used if no picture has been added)
exports.setPlaceholderPicture = (family) => {
    // TODO - apply placeholder in DB functions above
    if (family.Picture == null || family.Picture == undefined) {
        family.Picture = "/pictures/member/default.png"; // Re-use member default image
    }
    return family;
}
