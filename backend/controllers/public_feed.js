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
  console.error('Connexion MySQL réussie sur le service FEED !')
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
    connection.query(`SELECT userId, postId, lastName, firstName, date, text, file FROM user JOIN posts ON user._id = posts.userId ORDER BY date DESC`,
      async function (_error, results, _fields) {
        /*for(feed of results){
          let comment = await connection.query(`SELECT userId, postId, lastName, firstName, date, text, file FROM user JOIN posts ON user._id = posts.userId ORDER BY date DESC`);
          feed.comment = comment;
        }*/
        // Get comments per feed to send -> [ { _id:..., txt:... AND comments: [..] } ]
        return res.status(200).json(results);
      });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.updateOnePost = async (req, res) => {
  try {
    const text = req.body.text;
    const postId = req.body.postId;

    connection.query(`UPDATE posts SET text = (?) WHERE postId = (?)`, [text, postId]);
    return res.status(200).json({ message: 'Publication mis à jour !' });
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
    const commentDate = new Date();

    connection.query(`INSERT INTO comments (comment, userId, postId, commentDate) VALUES (?,?,?,?)`, [comment, userId, postId, commentDate]);
    return res.status(201).json({ message: 'Commentaire envoyé !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.updateOneComment = async (req, res) => {
  try {
    const comment = req.body.comment;
    const commentId = req.body.commentId;

    connection.query(`UPDATE comments SET comment = (?) WHERE commentId = (?)`, [comment, commentId]);
    return res.status(200).json({ message: 'Commentaire mis à jour !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.getAllCommentByPost = async (req, res) => {
  try {
    connection.query(`SELECT commentId, postId, userId, lastName, firstName, comment, commentDate FROM user JOIN comments ON user._id = comments.userId ORDER BY commentDate ASC`,
      function (_error, results, _fields) {
        return res.status(200).json(results);
      });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.deleteOnePost = async (req, res) => {
  try {
    const id = req.params.id;

    connection.query(`DELETE FROM comments WHERE postId = (?)`, [id]);
    connection.query(`DELETE FROM posts WHERE postId = (?)`, [id]);
    return res.status(200).json({ message: 'Publication et ses commentaires supprimés !'})
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.deleteOneComment = async (req, res) => {
  try {
    const commentId = req.params.id;
 // && owner_id==req.auth.id
    connection.query(`DELETE FROM comments WHERE commentId = (?)`, [commentId]);
    return res.status(200).json({ message: 'Commentaire supprimé !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};