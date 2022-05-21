const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config('../.env');
const mysql = require('mysql2');
const RegisterUser = require('../types/registerUser');
const LoginUser = require('../types/loginUser ');

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

exports.register = async (req, res) => {
  try {
    const newUser = new RegisterUser(req.body);

    if (req.body.confirmPassword !== newUser.password) {
      throw res.status(409).json({ message: 'Les mots de passe doivent être identiques !' });
    } else {
      const hash = await bcrypt.hash(newUser.password, 10);
      connection.query(`INSERT INTO user (lastName, firstName, email, password) VALUES (?,?,?,?)`, [newUser.lastName, newUser.firstName, newUser.email, hash]);
      return res.status(201).json({ message: 'Inscription réussie !' });
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.login = async (req, res) => {
  try {
    const user = new LoginUser(req.body);

    connection.query(`SELECT * FROM user WHERE email = ?`, [user.email], function (_error, results, _fields) {
      if (results.length !== 1) {
        return res.status(404).json({ message: 'Aucun compte n\'existe avec cet email !' });
      }

      bcrypt.compare(user.password, results[0].password).then((valid) => {
        if (!valid) {
          return res.status(401).json({ message: 'Mot de passe incorrect !' });
        }
        return res.status(200).json({
          userId: results[0]._id,
          token: jwt.sign(
            { userId: results[0]._id },
            `${process.env.SECRET_TOKEN}`,
            { expiresIn: '24h' }
          )
        });
      });
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.profilUpdate = async (req, res) => {
  try {
    const newUser = new RegisterUser(req.body);

    if(req.body.password !== '' || newUser.password !== ''){

    }
    if (req.body.confirmPassword !== newUser.password) {
      throw res.status(409).json({ message: 'Les mots de passe doivent être identiques !' });
    } else {
      const hash = await bcrypt.hash(newUser.password, 10);
      connection.query(`UPDATE user SET lastName = ?, firstName = ?, password = ? WHERE email = ${newUser.email}`, [newUser.lastName, newUser.firstName, hash]);
      return res.status(201).json({ message: 'Inscription réussie !' });
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};

exports.getUser = async (req, res) => {
  try {
    let id = req.params.id;

    connection.query(`SELECT * FROM user WHERE _id = (?)`, [id], function (_error, results, _fields) {
      if (results.length !== 1) {
        return res.status(404).json({ message: 'Aucun compte n\'existe avec cet id !' });
      }
      return res.status(200).json([{
        lastName: results[0].lastName,
        firstName: results[0].firstName,
        email: results[0].email,
      }]);
    });
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};