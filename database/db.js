const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('include', 'postgres', 'in123.', {
    host: 'localhost',
    dialect: 'postgres'
  });

/*sequelize.authenticate()
.then(() => {
    console.log("Conexão com o banco de dados realizado com sucesso!");
}).catch( (erro)=> {
    console.log("Erro: Conexão com o banco de dados não realizado com sucesso! Erro gerado: " + erro);
});*/

  module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}