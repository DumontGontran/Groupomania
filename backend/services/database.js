const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE}`
  });
  
  connection.connect(function (error) {
    if (error) {
      console.error('Connexion MySQL échouée: ' + error.stack);
      return;
    }
    console.error('Connexion MySQL réussie !')
  });

  module.exports = connection;