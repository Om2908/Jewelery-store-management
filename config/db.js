// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jewelery','root','root', {
    host:'localhost',
  dialect: 'mysql', // Or your preferred database
});

sequelize.sync({alter:true}).then(()=>{
    console.log('database succesfully');
}).catch(()=>{
    console.log("database not connected");
});
module.exports = sequelize;
