const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config)
db.Hashtag = require('./hashtag')
db.Comment = require('./comment')
db.Image = require('./image')
db.Post = require('./post')
db.User = require('./user')

Object.keys(db).forEach(modelName =>{
  db[modelName].init(sequelize);
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
