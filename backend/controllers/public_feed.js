const jwt = require('jsonwebtoken');

require('dotenv').config('../.env');
const mysql = require('mysql2');
/* const NewPost = require('../types/newPost'); */

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
});

exports.newPost = async (req, res) => {
  try {
        const text = req.body.text;
        const file = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const userId = req.body.userId;


      connection.query(`INSERT INTO posts (text, file, UserId) VALUES (?,?,?)`, [text, file, userId]);
      return res.status(201).json({ message: 'Publication réussie !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};