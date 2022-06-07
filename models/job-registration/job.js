const db = require('../../database/db');

const Job = db.sequelize.define('job', {
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: db.Sequelize.STRING,
        allowNull:false,
        validate: { 
            notEmpty: {
                msg: "Esse campo não pode ser vazio"
            },
        }
    },
    requisitos: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    beneficios: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    salario: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull:false
    },
    job_id: {
        type: db.Sequelize.INTEGER,
        foreignKey: true}

})

Job.associate = (models) => {
    Job.belongsTo(models.page,
    { foreignKey: 'job_id', as: 'jobs' });
};
//Criar a tabela
//Job.sync({force: true})


module.exports = Job;