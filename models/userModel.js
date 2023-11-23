const { DataTypes } = require('sequelize')
const { sequelize } = require('../dbConfig')

const userSchema = sequelize.define('user', {
    userEmail : {
        type : DataTypes.STRING,
    }
})

userSchema.sync({ alter : true })

module.exports = userSchema;
