const bcrypt = require('bcrypt');

require('dotenv').config('../.env');
const mysql = require('mysql2');
const User = require('../types/user');

const connection = mysql.createConnection({
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE}`
  });
  
  connection.connect(function (err) {
    if (err) {
      console.error('Connexion MySQL échouée: ' + err.stack);
      return;
    }
    console.error('Connexion MySQL réussie !')
  });

exports.register = async (req, res) => {
  try {
    const newUser = new User(req.body);

    if(req.body.confirmPassword !== newUser.password){
      return res.status(409).json({ message: 'Les mots de passe doivent être identiques !'});
    }else{
    const hash = await bcrypt.hash(newUser.password, 10);
    connection.query(`INSERT INTO user (lastName, firstName, email, password) VALUES (?,?,?,?)`, [newUser.lastName, newUser.firstName, newUser.email, hash]);
    return res.status(201).json({message: 'Inscription réussie !'});
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};