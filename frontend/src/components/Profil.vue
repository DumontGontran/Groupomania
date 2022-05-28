<template>
  <h2>Profil</h2>
  <form class="flex flex_column" v-for="user in users" :key="user.id">
    <h3>Gestion du Profil</h3>
    <img class="flex flex_align--center avatar" src="../assets/avatar/avatar.png" alt="Avatar">
    <label for="lastName">Nom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="lastName" id="lastName"
      v-model="users[0].lastName" placeholder="Doe" required />
    <label for="firstName">Prénom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="firstName" id="firstName"
      v-model="users[0].firstName" placeholder="John" required />
    <label for="email">Email:</label>
    <input class="flex flex_justify--center flex_align--center" type="email" name="email" id="email"
      v-model="users[0].email" placeholder="doe.john@outlook.fr" disabled />
    <div class="navForm flex flex_align--center flex_justify--center">
      <input type="submit" value="Modifier" id="submit" v-on:click.prevent="updateProfil" />
      <router-link class="linkForm" to="/profil/password">Gestion du mot de passe</router-link>
    </div>
    <router-link class="linkForm--delete" to="/register" v-on:click.prevent="deleteOneUser">Supprimer le compte utilisateur</router-link>
    <p class="message">{{ message }}</p>
  </form>
</template>

<script>
import UserService from '../services/user'

export default {
  name: "ProfilForm",
  data() {
    return {
      users: [],
      message: ''
    }
  },
  async mounted() {
    const userId = localStorage.getItem('userId')

    this.users = await UserService.getOneProfilUser(userId)
    console.log('GET Profil', this.users[0])
  },
  methods: {
    updateProfil() {
      const userId = localStorage.getItem('userId')
      
      UserService.updateOneProfilUser(this.users[0], userId)
      .then(res => {
      this.message = 'Profil mis à jour !'
      setTimeout(() => {
          window.location.href = 'http://localhost:8080/profil'
          }, 1000)
      }),
      console.log('UPDATE Profil', this.users[0])
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
  border: 2px solid black;
  border-radius: 50px 50px 50px 50px;

  &:hover {
    border: 2px solid black;
    box-shadow: 0px 1px 10px darkblue;

  }
}

form {
  margin: auto;
  margin-top: 20px;
  padding: 0 0;
  border: 3px solid black;
  border-radius: 10px 10px 10px 10px;
  width: 400px;
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
  width: 150px;
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

  &--delete{
    color: red;

    &:hover {
      font-weight: bold;
    }
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