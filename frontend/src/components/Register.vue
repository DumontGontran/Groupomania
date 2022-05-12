<template>
  <form class="flex flex_column">
    <h1>S'inscrire</h1>
    <label for="lastName">Nom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="lastName" id="lastName"
      v-model="registerData.lastName" />
    <p class="lastNameError"></p>
    <label for="firstName">Prénom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="firstName" id="firstName"
      v-model="registerData.firstName" />
    <p class="firstNameError"></p>
    <label for="email">Email:</label>
    <input class="flex flex_justify--center flex_align--center" type="email" name="email" id="email"
      v-model="registerData.email" />
    <p class="emailError"></p>
    <label for="password">Mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="password" id="password"
      v-model="registerData.password" />
    <p class="passwordError"></p>
    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="confirmPassword"
      id="confirmPassword" v-model="registerData.confirmPassword" />
    <p class="confirmPasswordError"></p>
    <div class="navForm flex flex_row flex_between flex_align--center">
      <input type="submit" value="Valider" id="submit" v-on:click.prevent="registerPost" />
      <router-link class="linkForm" to="/login">Se Connecter</router-link>
    </div>
    <p class="message">{{ registerMessage.message }}</p>
  </form>
</template>

<script>
import axios from 'axios'
export default {
  name: "RegisterForm",
  data() {
    return {
      registerMessage:{
      message: ''
      },
      registerData: {
        lastName: '',
        firstName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    registerPost() {
      const user = {
        'lastName': this.registerData.lastName,
        'firstName': this.registerData.firstName,
        'email': this.registerData.email,
        'password': this.registerData.password,
        'confirmPassword': this.registerData.confirmPassword
      }

      axios
        .post('http://localhost:3000/api/user/register', user)
        .then(res => {
          console.log(res)
          console.log(user)
          this.registerMessage.message = res.data.message
        })
        .catch(error => {
          console.log(error)
          console.log(user)
          this.registerMessage.message = 'Le formulaire doit être correctement remplis !'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;

  &_row {
    flex-direction: row;
  }

  &_column {
    flex-direction: column;
  }

  &_between {
    justify-content: space-between;
  }

  &_justify--center {
    justify-content: center;
  }

  &_align--center {
    align-items: center;
  }
}

form {
  margin: auto;
  padding: 0 0;
  border: 3px solid black;
  border-radius: 10px 10px 10px 10px;
  width: 400px;
}

h1 {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: red;
  color: white;
  border: 1px solid red;
  border-bottom: 1px solid black;
  border-radius: 6px 6px 0 0;
}

label {
  padding-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 5px;
  text-align: left;
  font-weight: bold;
}

input {
  margin-left: 10px;
  margin-right: 10px;
}

#submit {
  background-color: white;
  color: black;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px 5px 5px 5px;
  width: 150px;
  height: 50px;

  &:hover {
    border: 1px solid red;
    color: red;
    box-shadow: 0px 1px 10px red;
  }
}

.navForm {
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 60px;
  margin-bottom: 20px;
}

.linkForm {
  color: red;
  text-decoration: none;

  &:hover {
    font-weight: bold;
  }
}

.message {
  margin-top: 0;
  color: red;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    text-decoration-color: black;
  }
}
</style>