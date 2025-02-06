const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.datebase,
    config.username,
    config.password,
    config
);

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file));
        console.log(file, model.name);
        db[model.name] = model;
        model.initiate(sequelize);
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
