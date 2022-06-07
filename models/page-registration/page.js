const db = require('../../database/db');

const Page = db.sequelize.define('page', {
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
    user_id: {
        type: db.Sequelize.INTEGER,
        foreignKey: true}
})

Page.associate = (models) => {
    Page.belongsTo(models.user,
    { foreignKey: 'user_id', as: 'users' });
};

Page.associate = (models) => {
    Page.hasMany(models.job,
    { foreignKey: 'job_id', as: 'jobes' });
};


//Criar a tabela
//Page.sync({force: true})

module.exports = Page;