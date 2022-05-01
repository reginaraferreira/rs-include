const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('include', 'postgres', 'in123.', {
    host: 'localhost',
    dialect: 'postgres'
  });

  module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}