const db = require('./db')

const CadastroPagina = db.sequelize.define('cadastroPagina', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    //idUser:{
    //    type: db.Sequelize.INTEGER,
    //    allowNull: false,
        //references: {         // User belongsTo Company 1:1
        //  model: 'Companies', //REVISAR COMPANHIES SE ESTÁ CORRETO
        //  key: 'id'
   // },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate: { 
            notEmpty: {
                msg: "Esse campo não pode ser vazio"
            },
        }
    },
    descricao: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    categoria: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    tipo: {
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
    }
})

//Criar a tabela
//CadastroPagina.sync({force: true})

module.exports = CadastroPagina;