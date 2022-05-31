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
    const date = new Date();


    connection.query(`INSERT INTO posts (text, file, UserId, date) VALUES (?,?,?,?)`, [text, file, userId, date]);
    return res.status(201).json({ message: 'Publication réussie !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    connection.query(`SELECT lastName, firstName, date, text, file, date FROM user JOIN posts ON user._id = posts.userId ORDER BY date DESC`, function (_error, results, _fields) {
        return res.status(200).json(results);
    });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};
