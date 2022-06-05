const jwt = require('jsonwebtoken');
const fs = require('fs');

require('dotenv').config('../.env');
const mysql = require('mysql2');
const CreatePost = require('../types/createPost');
const ModifyPost = require('../types/modifyPost');
const CreateComment = require('../types/createComment');
const ModifyComment = require('../types/modifyComment');

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
    const post = new CreatePost({
      'text': req.body.text
    });

    const file = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    const userId = req.body.userId;
    const date = new Date();

    connection.query(`INSERT INTO posts (text, file, userId, date) VALUES (?,?,?,?)`, [post.text, file, userId, date]);
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
      function (_error, results, _fields) {
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
    const post = new ModifyPost({
      'text': req.body.text
    });

    const postId = req.body.postId;
    const updateDate = new Date();

    connection.query(`UPDATE posts SET text = (?), date = (?) WHERE postId = (?)`, [post.text, updateDate, postId]);
    return res.status(200).json({ message: 'Publication mis à jour !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.createOneComment = async (req, res) => {
  try {
    const comment = new CreateComment({
      'comment': req.body.comment
    });

    const userId = req.body.userId;
    const postId = req.body.postId;
    const commentDate = new Date();

    connection.query(`INSERT INTO comments (comment, userId, postId, commentDate) VALUES (?,?,?,?)`, [comment.comment, userId, postId, commentDate]);
    return res.status(201).json({ message: 'Commentaire envoyé !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.updateOneComment = async (req, res) => {
  try {
    const comment = new ModifyComment({
      'comment': req.body.comment
    });

    const commentId = req.body.commentId;
    const updateCommentDate = new Date();

    connection.query(`UPDATE comments SET comment = (?), commentDate = (?) WHERE commentId = (?)`, [comment.comment, updateCommentDate, commentId]);
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
    let postId = req.params.id;

    connection.query(`SELECT file FROM posts WHERE postId = (?)`, [postId], function (_error, results, _fields) {
      fs.unlink(`images/${results[0].file.split('/images/')[1]}`, async () => {
        connection.query(`DELETE FROM comments WHERE postId = (?)`, [postId]);
        connection.query(`DELETE FROM posts WHERE postId = (?)`, [postId]);
        return res.status(200).json({ message: 'Publication et ses commentaires supprimés !' });
      });
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.deleteOneComment = async (req, res) => {
  try {
    let commentId = req.params.id;

    connection.query(`DELETE FROM comments WHERE commentId = (?)`, [commentId]);
    return res.status(200).json({ message: 'Commentaire supprimé !' });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};