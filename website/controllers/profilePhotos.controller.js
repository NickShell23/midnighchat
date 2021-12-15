const db = require("../../db/models");
const ProfilePhotos = db.profilePhotos;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
// const { use } = require("../routes/profilePhotos.routes");

//Create a new profilePhotos
exports.create = (req, res) => {
  // Validate request
/*   if (!req.body.title) {
      res.status(400).send({
          message: "title can not be empty!"
      });
      return;
  } */

  // Create a profilePhotos
  const photos = {
    tg_id: req.body.tg_id,
    photo1: req.body.photo1,
    photo2: req.body.photo2,
    photo3: req.body.photo3,
    photo4: req.body.photo4,
}

  // Save profilePhotos in the database
  msgToDelete.create(photos)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the PHOTOS."
          });
      });
};


// Retrieve all profilePhotos from the database.
exports.findAll = (req, res) => {
  const tg_id = { tg_id: req.body.tg_id };

  msgToDelete.findAll({ where: tg_id })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred."
          });
      });
};

  // Find a single profilePhoto with tg_id
exports.findOne = (req, res) => {
    const photos = {
        tg_id: req.body.tg_id,
        photo1: req.body.photo1,
        photo2: req.body.photo2,
        photo3: req.body.photo3,
        photo4: req.body.photo4,
    }
  
    return msgToDelete.findOne(req.body, {
        where: {photos}
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


//Update a specific profilePhotos with id
exports.update = (req, res) => {
    const photos = {
        tg_id: req.body.tg_id,
        photo1: req.body.photo1,
        photo2: req.body.photo2,
        photo3: req.body.photo3,
        photo4: req.body.photo4,
    }
    msgToDelete.update(req.body, {
        photos,
        where: { tg_id: tg_id }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  postMessage: "This user's informations were updated successfully."
              });
          } else {
              res.send({
                  message: `Cannot update this photos with tg_id. Maybe they were not found or req.body is empty!`
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
  const id ={ id: req.params.id,
              tg_id: req.body.tg_id
            }

  msgToDelete.destroy({
          where: { tg_id: tg_id }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "This user  was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot delete this user  with id. Maybe this person  was not found!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Could not delete this user with id"
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
          res.send({ message: `all users were deleted successfully!` });
      })
      .catch(err => {
          res.status(500).send({
              message: err.company || "Some error occurred while removing all users."
          });
      });
};