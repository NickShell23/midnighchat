const db = require("../../db/models");
const msgToDelete = db.msgtodelete;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { use } = require("../routes/msgtodelete.routes");

//Create a new user
exports.create = (req, res) => {
  // Validate request
/*   if (!req.body.title) {
      res.status(400).send({
          message: "title can not be empty!"
      });
      return;
  } */

  // Create a company
  const msgDetails = {
    tg_id: req.body.tg_id,
    botMsg_id: req.body.botMsg_id,
}

  // Save Company in the database
  msgToDelete.create(msgDetails)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the USER."
          });
      });
};


// Retrieve all companies from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? {
      title: {
          [Op.like]: `%${title}%`
      }
  } : null;

  msgToDelete.findAll({ where: condition })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving the company."
          });
      });
};

  // Find a single user with  verif_code
exports.findOne = (req, res) => {
    const msgDetails = {
        tg_id: req.body.tg_id,
        botMsg_id: req.body.botMsg_id,
    }
  
    return msgToDelete.findOne(req.body, {
        where: {msgDetails}
    })
      .then(data => {
        if (data) {
          res.send(data)
        } else {
            res.send("nope")/* callback(null, false); */
        }
      })
      .catch(err => {
        res.send("err");
      })
  };



// Find a single user with  verif_code
/* exports.test1 = (req, res) => {
    const promise = (User.findOne({where: req.params.verif_code}));
  
    promise.then(data => {
        if (data) {
          res.send(true);
        } else {
          res.send(false);
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + verif_code
        });
      });
  }; */


//Update a specific  user with id
exports.update = (req, res) => {
    const msgDetails = {
        tg_id: req.body.tg_id,
        botMsg_id: req.body.botMsg_id,
    }
    msgToDelete.update(req.body, {
        msgDetails,
        where: { tg_id: tg_id }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  postMessage: "This user's informations were updated successfully."
              });
          } else {
              res.send({
                  message: `Cannot update this user with verif_code=${verif_code} 's informations. Maybe they were not found or req.body is empty!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating this user  with verif_code=" + verif_code
          });
      });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  msgToDelete.destroy({
          where: { id: id }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "This user  was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot delete this user  with id=${id}. Maybe this person  was not found!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Could not delete this user with id=" + id
          });
      });
};

// Delete all people  from the database.
exports.deleteAll = (req, res) => {
    msgToDelete.destroy({
          where: {},
          truncate: false
      })
      .then(nums => {
          res.send({ message: `${nums} all users were deleted successfully!` });
      })
      .catch(err => {
          res.status(500).send({
              message: err.company || "Some error occurred while removing all users."
          });
      });
};