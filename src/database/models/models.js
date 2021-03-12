const Sequelize = require('sequelize');

const user = 'john';
const host = 'localhost';
const database = 'mydb';
const password = '';
const port = '5432';

const sequelize = new Sequelize(
    database, 
    user, 
    password, 
    {
        host, 
        port, 
        dialect: 'postgres', 
        logging: false
    }
);

sequelize.define('user', {
    // id: {
    //     type: Sequelize.UUID,
    //     primaryKey: true,
    //     defaultValue
    // },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    age: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
},
{
    timestamps: false
}
);

module.exports = sequelize;