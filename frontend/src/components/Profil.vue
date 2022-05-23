<template>
  <h2>Profil</h2>
  <form class="flex flex_column" v-for="user in users" :key="user.id">
    <img class="flex flex_align--center avatar" src="../assets/avatar/avatar.png" alt="Avatar">
    <label for="lastName">Nom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="lastName" id="lastName"
      v-model="user.lastName" placeholder="Doe" v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <!-- <p v-if="user.lastName.$error">Nom requis</p> -->
    </div>
    <label for="firstName">Prénom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="firstName" id="firstName"
      v-model="user.firstName" placeholder="John" v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <!-- <p v-if="v$.firstName.$error">{{ v$.firstName.$errors[0].$message }}</p> -->
    </div>
    <label for="email">Email:</label>
    <input class="flex flex_justify--center flex_align--center" type="email" name="email" id="email"
      v-model="user.email" placeholder="doe.john@outlook.fr" disabled v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <!-- <p v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p> -->
    </div>
    <label for="password">Mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="password" id="password"
      v-model="user.password" placeholder="Motdepasse" v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <!-- <p v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p> -->
    </div>
    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="confirmPassword"
      id="confirmPassword" v-model="user.confirmPassword" placeholder="Motdepasse" v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <!-- <p v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</p> -->
    </div>
    <div class="navForm flex flex_align--center flex_justify--center">
      <input type="submit" value="Valider" id="submit" v-on:click.prevent="updateOneUser" />
    </div>
    <p class="message">{{ message }}</p>
  </form>
</template>

<script>
import axios from 'axios'
import UserService from '../services/user'
import { required, minLength, maxLength, sameAs } from '@vuelidate/validators'

export default {
  name: "RegisterForm",
  data() {
    return {
      users: [],
      message: ''
    }
  },
  validations() {
    return{
      user: {
        lastName: { required },
        firstName: { required },
        email: { required, email },
        password: { required, minLength: minLength(8), maxLength: maxLength(16) },
        confirmPassword: { required, sameAsPassword: sameAs(this.password) }
      }
    }
  },
  async mounted() {
    let userId = localStorage.getItem('userId')

    this.users = await UserService.getOneUser(userId)
    console.log('Profil', this.users)
  },
  methods: {
   updateOneUser() {
     let userId = localStorage.getItem('userId')
     const token = localStorage.getItem('token')

      const user = {
        'lastName': this.users[0].lastName,
        'firstName': this.users[0].firstName,
        'email': this.users[0].email,
        'password': this.users[0].password,
        'confirmPassword': this.users[0].confirmPassword
      }

      axios
        .put('http://localhost:3000/api/user/profil/' + userId, user, {
            headers: {
                'Authorization': 'Bearer '+ token
            }
        })
        .then(res => {
          console.log(res)
          console.log(user)
          this.state.message = res.data.message
        })
        .catch(error => {
          console.log(error)
          console.log(user)
        })
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
  border-radius: 10px 10px 10px 10px;
  width: 400px;
}

h2 {
  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-thickness: 20%;
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
  margin-right: 0;
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
    border: 1px solid red;
    color: red;
    box-shadow: 0px 1px 10px red;
  }
}

.navForm {
  margin-top: 20px;
  margin-left: 0;
  margin-right: 0;
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