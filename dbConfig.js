const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.databaseName, process.env.userName, process.env.password, {
    host: 'localhost',
    dialect: "mysql"
})

try{
    sequelize.authenticate();
    console.log(`Database connection successfully`);
}catch(error){
    console.log(error);
}

module.exports = { sequelize }
