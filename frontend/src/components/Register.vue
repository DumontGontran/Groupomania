<template>
  <img class="logo" src="../assets/logo/icon-above-font.svg" alt="Logo Groupomania"/>
  <form class="flex flex_column">
    <h1>S'inscrire</h1>
    <label for="lastName">Nom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="lastName" id="lastName"
      v-model="state.lastName" :class="{ 'is-invalid': state.lastName.$error }" placeholder="Doe"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.lastName.$error">{{ v$.lastName.$errors[0].$message }}</p>
    </div>
    <label for="firstName">Prénom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="firstName" id="firstName"
      v-model="state.firstName" :class="{ 'is-invalid': state.firstName.$error }" placeholder="John"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.firstName.$error">{{ v$.firstName.$errors[0].$message }}</p>
    </div>
    <label for="email">Email:</label>
    <input class="flex flex_justify--center flex_align--center" type="email" name="email" id="email"
      v-model="state.email" :class="{ 'is-invalid': state.email.$error }" placeholder="doe.john@outlook.fr"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
    </div>
    <label for="password">Mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="password" id="password"
      v-model="state.password" :class="{ 'is-invalid': state.password.$error }" placeholder="Motdepasse"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
    </div>
    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="confirmPassword"
      id="confirmPassword" v-model="state.confirmPassword" :class="{ 'is-invalid': state.confirmPassword.$error }"
      placeholder="Motdepasse" v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</p>
    </div>
    <div class="navForm flex flex_row flex_between flex_align--center">
      <input type="submit" value="Valider" id="submit" v-on:click.prevent="registerSubmit" />
      <router-link class="linkForm" to="/login">Se Connecter</router-link>
    </div>
    <p class="message">{{ message }}</p>
  </form>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email, sameAs } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  name: "RegisterForm",
  setup() {
    const state = reactive({
      lastName: '',
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      message: ''
    })

    const rules = computed(() => {
      return {
        lastName: { required },
        firstName: { required },
        email: { required, email },
        password: { required, minLength: minLength(8), maxLength: maxLength(16) },
        confirmPassword: { required, sameAsPassword: sameAs(state.password) }
      }
    })

    const v$ = useVuelidate(rules, state)

    return {
      state,
      v$
    }
  },
  methods: {
    registerValidation() {
      this.v$.$validate()
    },

    registerSubmit() {
      const user = {
        'lastName': this.state.lastName,
        'firstName': this.state.firstName,
        'email': this.state.email,
        'password': this.state.password,
        'confirmPassword': this.state.confirmPassword
      }

      axios
        .post('http://localhost:3000/api/user/register', user)
        .then(res => {
          console.log(res)
          console.log(user)
          this.message = res.data.message
        })
        .catch(error => {
          console.log(error)
          console.log(user)
          this.message = 'Le formulaire doit être correctement remplis !'
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.logo{
    width: 200px;
    height: 200px;
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

.invalid-feedback{
  margin-left: 10px;
  color: red;
  text-align: left;
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