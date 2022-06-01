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

exports.createOnePost = async (req, res) => {
  try {
    const text = req.body.text;
    const file = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const userId = req.body.userId;
    const date = new Date();

    connection.query(`INSERT INTO posts (text, file, userId, date) VALUES (?,?,?,?)`, [text, file, userId, date]);
    return res.status(201).json({ message: 'Publication réussie !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    connection.query(`SELECT postId, lastName, firstName, date, text, file FROM user JOIN posts ON user._id = posts.userId ORDER BY date DESC`, function (_error, results, _fields) {
      return res.status(200).json(results);
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.createOneComment = async (req, res) => {
  try {
    const comment = req.body.comment;
    const userId = req.body.userId;
    const postId = req.body.postId;

    connection.query(`INSERT INTO comments (comment, userId, postId) VALUES (?,?,?)`, [comment, userId, postId]);
    return res.status(201).json({ message: 'Commentaire envoyé !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};
