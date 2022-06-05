<template>
  <Header />
  <h2>Profil</h2>
  <form class="flex flex_column">
    <h3>Gestion du mot de passe</h3>
    <label for="password">Nouveau mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="password" id="password"
      v-model="password" placeholder="Motdepasse" required />
    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="confirmPassword"
      id="confirmPassword" v-model="confirmPassword" placeholder="Motdepasse" required />
    <div class="navForm flex flex_align--center flex_justify--center">
      <input type="submit" value="Modifier" id="submit" v-on:click.prevent="updatePassword" />
      <router-link class="linkForm" to="/profil">Gestion du Profil</router-link>
    </div>
    <p class="message">{{ message }}</p>
  </form>
</template>

<script>
import Header from '../components/Header'
import UserService from '../services/user.service'

export default {
  name: "PasswordForm",
  components: {
    Header
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      message: ''
    }
  },
  methods: {
    async updatePassword() {
      if (this.password == '' || this.confirmPassword == '') {
        return this.message = 'Mot de passe requis !'
      }
      else if (this.password !== this.confirmPassword) {
        return this.message = 'Doivent être identique !'
      }
      else if (this.password.length < 8 || this.confirmPassword.length < 8) {
        return this.message = 'Doit contenir minimum 8 caractères !'
      }
      else if (this.password.length > 16 || this.confirmPassword.length > 16) {
        return this.message = 'Doit contenir maximum 16 caractères !'
      }
      else {
        await UserService.updateOnePasswordUser(this.password, this.confirmPassword)
        return this.message = 'Mot de passe mis à jour !'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  width: 200px;
  height: 200px;
}

.avatar {
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  border-radius: 50px 50px 50px 50px;

  &:hover {
    border: 1px solid red;
    box-shadow: 0px 1px 10px red;

  }
}

form {
  margin: auto;
  margin-top: 20px;
  padding: 0 0;
  border: 3px solid black;
  background-color: #FFD7D7;
  border-radius: 10px 10px 10px 10px;
  width: 350px;
}

h2 {
  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-thickness: 20%;
}

h3 {
  font-size: 18px;
  margin: 0;
  padding-top: 36px;
  padding-bottom: 18px;
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

  &:disabled {
    background-color: lightgrey;
  }
}

.invalid-feedback {
  margin-left: 10px;
  color: red;
  text-align: left;
}

#submit {
  margin-left: 0;
  margin-right: 10px;
  background-color: white;
  color: black;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px 5px 5px 5px;
  width: 110px;
  height: 50px;

  &:disabled {
    background-color: lightgrey;

    &:hover {
      border: 1px solid black;
      color: black;
      box-shadow: none;
    }
  }

  &:hover {
    border: 1px solid darkblue;
    color: darkblue;
    box-shadow: 0px 1px 10px darkblue;
  }
}

.navForm {
  margin-top: 20px;
  margin-bottom: 20px;
}

.linkForm {
  color: darkblue;
  text-decoration: none;

  &:hover {
    font-weight: bold;
  }
}

.message {
  margin-top: 0;
  color: darkblue;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
    text-decoration-color: black;
  }
}
</style>