'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const AbstractBusiness = require('./AbstractBusiness.js');
const dotenv = require('dotenv');
dotenv.config();
let sequelize = null;

const getConnect = function () {
    if(sequelize === null){
        sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
            host: process.env.DB_HOST,
            dialect: 'mysql',
            define: {
                timestamps: false
            },
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            },
            timezone: '+07:00' //for writing to database
        });
        AbstractBusiness.connection = sequelize;
    }
    return sequelize;
};
module.exports = {
    dbo: {},
    getConnect: getConnect,
    migrate: async function () {
        return await sequelize.sync.apply(sequelize, this.arguments);
    },
    define: function (table_name, table_info) {
        if(sequelize === null){
            getConnect()
        }
        return sequelize.define(table_name, table_info);
    },
    AbstractBusiness: AbstractBusiness
};