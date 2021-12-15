// var dbConn = require('./../config/server');

//Users object create

module.exports = (sequelize, Sequelize) => {
    const bcrypt = require("bcryptjs");
    const Viewed = sequelize.define("viewed", {
        tg_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        checkedTg_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        like: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        star: {
            type: Sequelize.STRING,
            allowNull: true,
        },


    });

    return Viewed;
};

// //Request to find (and display) one people with his ID
// People.findById = function(id, result) {
//     dbConn.query("Select * from people where peopleId = ? ", id, function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(err, null);
//         } else {
//             result(null, res);
//         }
//     });
// };

// //Request to find (and display) all people
// People.findAll = function(result) {
//     dbConn.query("Select * from people", function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else {
//             console.log('people : ', res);
//             result(null, res);
//         }
//     });
// };

// //Update de informations of one people
// People.update = function(id, people, result) {
//     dbConn.query("UPDATE people SET firstName=?, lastName=?, password=?, email=?, gender=?, peopleCompanyId=?, phone=?, isAdmin=?, isCompany=? where peopleId = ?", [people.firstName, people.lastName, people.password, people.email, people.gender, people.peopleCompanyId, people.phone, people.isAdmin, people.isCompany, id], function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else { result(null, res); }
//     });
// };

// //Delete one people (find him with his ID)
// People.delete = function(id, result) {
//     dbConn.query("DELETE FROM people WHERE peopleId = ?", [id], function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else { result(null, res); }
//     });
// };

// module.exports = People;