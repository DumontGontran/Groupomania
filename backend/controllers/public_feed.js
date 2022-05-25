const jwt = require('jsonwebtoken');

require('dotenv').config('../.env');
const mysql = require('mysql2');
const NewPost = require('../types/newPost');

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

exports.newPost = async (req, res) => {
  try {
    const newPost = new NewPost({
      text: req.body.text,
      file: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: req.body.userId,
      like: req.body.like
    });

    await newPost.save();

    connection.query(`INSERT INTO posts (text, file, UserId, like) VALUES (?,?,?,?)`, [newPost.text, newPost.file, newPost.userId, newPost.like]);
    return res.status(201).json({ message: 'Publication réussie !' });

  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};