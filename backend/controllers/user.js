const bcrypt = require('bcrypt');

require('dotenv').config('../.env');
const mysql = require('mysql2');

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
      const lastName = req.body.lastName;
      const firstName = req.body.firstName;
      const email = req.body.email.toLowerCase().split(' ').join('');
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;

    if(confirmPassword !== password){
      return res.status(409).json({ message: 'Les mots de passe doivent être identiques !'});
    }else{
    const hash = await bcrypt.hash(password, 10);
    connection.query(`INSERT INTO user (lastName, firstName, email, password) VALUES (?,?,?,?)`, [lastName, firstName, email, hash]);
    return res.status(201).json({message: 'Inscription réussie !'});
    }
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur interne !' });
  }
};