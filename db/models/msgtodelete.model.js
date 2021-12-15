// var dbConn = require('./../config/server');

//Users object create

module.exports = (sequelize, Sequelize) => {
    const bcrypt = require("bcryptjs");
    const msgToDelete = sequelize.define("msgtodelete", {
        tg_id: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        botMsg_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        botMsg2_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        botMsg3_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        botMsg4_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        botMsg5_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },

    });

    return msgToDelete;
};
