<template>
  <img class="logo" src="../assets/logo/icon-above-font.svg" alt="Logo Groupomania"/>
  <form class="flex flex_column">
    <h2>S'inscrire</h2>
    <label for="lastName">Nom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="lastName" id="lastName"
      v-model="state.lastName" :class="{ 'is-invalid': state.lastName.$error }" placeholder="Doe"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.lastName.$error">Nom requis</p>
    </div>
    <label for="firstName">Prénom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="firstName" id="firstName"
      v-model="state.firstName" :class="{ 'is-invalid': state.firstName.$error }" placeholder="John"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.firstName.$error">Prénom requis</p>
    </div>
    <label for="email">Email:</label>
    <input class="flex flex_justify--center flex_align--center" type="email" name="email" id="email"
      v-model="state.email" :class="{ 'is-invalid': state.email.$error }" placeholder="doe.john@outlook.fr"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.email.$error">Email valide requis</p>
    </div>
    <label for="password">Mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="password" id="password"
      v-model="state.password" :class="{ 'is-invalid': state.password.$error }" placeholder="Motdepasse"
      v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.password.$error">Mot de passe requis, doit contenir entre 8 et 16 caractères</p>
    </div>
    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="confirmPassword"
      id="confirmPassword" v-model="state.confirmPassword" :class="{ 'is-invalid': state.confirmPassword.$error }"
      placeholder="Motdepasse" v-on:keyup.prevent="registerValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.confirmPassword.$error">Doit être identique au mot de passe</p>
    </div>
    <div class="navForm flex flex_row flex_between flex_align--center">
      <input type="submit" value="Valider" id="submit" v-bind:disabled="v$.$invalid" v-on:click.prevent="registerSubmit" />
      <router-link class="linkForm" to="/login">Se Connecter</router-link>
    </div>
    <p class="message">{{ state.message }}</p>
  </form>
</template>

<script>
import UserService from '../services/user.service'
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
      UserService.registerOneProfilUser(this.state)
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
  background-color: #FFD7D7;
  border-radius: 10px 10px 10px 10px;
  width: 350px;
}

h2 {
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
  margin-left: 40px;
  margin-right: 60px;
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