const db = require('./db');
//const cadastro = models.cadastro;

const CadastroPagina = db.sequelize.define('cadastroPagina', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull:false,
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
    },
    cadastro_id: {
        type: db.Sequelize.INTEGER,
        foreignKey: true}
})

CadastroPagina.associate = (models) => {
    CadastroPagina.belongsTo(models.Cadastro,
    { foreignKey: 'user_id', as: 'cadastros' });
};


//Criar a tabela
//CadastroPagina.sync({force: true})

module.exports = CadastroPagina;