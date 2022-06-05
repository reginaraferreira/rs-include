const db = require('./db');
//const CadastroPagina = require("./cadastroPagina");

const Cadastro = db.sequelize.define('cadastro', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate: { 
            notEmpty: {
                msg: "Esse campo não pode ser vazio"
            },
        }
    },
    sobrenome: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    estado: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    escolaridade: {
        type: db.Sequelize.STRING,
        allowNull:true
    },
    instituicao:{
        type: db.Sequelize.STRING
    },
    empresa:{
        type: db.Sequelize.STRING
    },
    cargo:{
        type: db.Sequelize.STRING
    },
    dianascimento: {
        type: db.Sequelize.INTEGER
    },
    mesnascimento: {
        type: db.Sequelize.INTEGER
    },
    anonascimento: {
        type: db.Sequelize.INTEGER
    }

})

Cadastro.associate = (models) => {
    Cadastro.hasMany(models.cadastroPagina,
    { foreignKey: 'cadastro_id', as: 'cadastroPaginas' });
};
//Criar a tabela
//Cadastro.sync({force: true})

module.exports = Cadastro;