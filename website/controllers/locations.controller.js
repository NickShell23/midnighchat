const db = require("../../db/models");
const Location = db.locations;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { use } = require("../routes/locations.routes");

//Create a new location
exports.create = (req, res) => {


  // Location's data
  const location = {
      tg_id: req.body.tg_id,
      verif_code: req.body.verif_code,
      city: req.body.city,
      region: req.body.region,
      country: req.body.country,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
  };

  // Save Location in the database
  Location.create(location)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the LOCATION."
          });
      });
};


// Retrieve all locations from the database.
exports.findAll = (req, res) => {
//   const title = req.query.title;
//   var condition = title ? {
//       title: {
//           [Op.like]: `%${title}%`
//       }
//   } : null;

const location = {
    tg_id: req.body.tg_id,
    verif_code: req.body.verif_code,
    city: req.body.city,
    region: req.body.region,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
};

Location.findAll({ where: location })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving the Location."
          });
      });
};

// Find a single location with something
exports.findOne = (req, res) => {
    const tg_id = req.params.tg_id;
    const location = {
        tg_id: req.body.tg_id,
        verif_code: req.body.verif_code,
        city: req.body.city,
        region: req.body.region,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    };
  
    return Location.findOne(req.body, {
        where: {location}
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



// Find a single location with  something
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
    const location = {
        id: req.params.id,
        tg_id: req.body.tg_id,
        verif_code: req.body.verif_code,
    };
  Location.update(req.body, {
          userDetails,
          where: { location }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  postMessage: "This location was updated successfully."
              });
          } else {
              res.send({
                  message: `Cannot update this location. Maybe something were not found or req.body is empty!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating this location"
          });
      });
};

// Delete a location with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const ids = {
    id: req.params.id,
    tg_id: req.body.tg_id,
    verif_code: req.body.verif_code,
    };

  Location.destroy({
          where: { ids }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "This location was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot delete this location. Maybe this person  was not found!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Could not delete this location with the id"
          });
      });
};

// Delete all locations from the database.
exports.deleteAll = (req, res) => {
  Location.destroy({
          where: {},
          truncate: false
      })
      .then(nums => {
          res.send({ message: `${nums} all locations were deleted successfully!` });
      })
      .catch(err => {
          res.status(500).send({
              message: err.company || "Some error occurred while removing all locations."
          });
      });
};