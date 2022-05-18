<template>
<h2>Profil</h2>
  <form class="flex flex_column">
    <img class="flex flex_align--center avatar" src="../assets/avatar/avatar.png" alt="Avatar">
    <label for="lastName">Nom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="lastName" id="lastName"
      v-model="state.lastName" :class="{ 'is-invalid': state.lastName.$error }" placeholder="Doe"
      v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.lastName.$error">{{ v$.lastName.$errors[0].$message }}</p>
    </div>
    <label for="firstName">Prénom:</label>
    <input class="flex flex_justify--center flex_align--center" type="text" name="firstName" id="firstName"
      v-model="state.firstName" :class="{ 'is-invalid': state.firstName.$error }" placeholder="John"
      v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.firstName.$error">{{ v$.firstName.$errors[0].$message }}</p>
    </div>
    <label for="email">Email:</label>
    <input class="flex flex_justify--center flex_align--center" type="email" name="email" id="email"
      v-model="state.email" :class="{ 'is-invalid': state.email.$error }" placeholder="doe.john@outlook.fr"
      disabled v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>
    </div>
    <label for="password">Mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="password" id="password"
      v-model="state.password" :class="{ 'is-invalid': state.password.$error }" placeholder="Motdepasse"
      v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</p>
    </div>
    <label for="confirmPassword">Confirmer mot de passe:</label>
    <input class="flex flex_justify--center flex_align--center" type="password" name="confirmPassword"
      id="confirmPassword" v-model="state.confirmPassword" :class="{ 'is-invalid': state.confirmPassword.$error }"
      placeholder="Motdepasse" v-on:keyup.prevent="profilValidation" />
    <div class="invalid-feedback">
      <p v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</p>
    </div>
    <div class="navForm flex flex_align--center flex_justify--center">
      <input type="submit" value="Valider" id="submit" v-bind:disabled="v$.$invalid" v-on:click.prevent="profilSubmitUpdate" />
    </div>
    <!-- <p class="message">{{ state.message }}</p> -->
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
      lastName: localStorage.getItem('profil'),
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
        email: { email },
        password: { minLength: minLength(8), maxLength: maxLength(16) },
        confirmPassword: { sameAsPassword: sameAs(state.password) }
      }
    })

    const v$ = useVuelidate(rules, state)

    return {
      state,
      v$
    }
  },
  methods: {
    profilValidation() {
      this.v$.$validate()
    },

    profilSubmitUpdate() {
      const user = {
        'lastName': this.state.lastName,
        'firstName': this.state.firstName,
        'email': this.state.email,
        'password': this.state.password,
        'confirmPassword': this.state.confirmPassword
      }

      axios
        .put('http://localhost:3000/api/user/profil', user)
        .then(res => {
          console.log(res)
          console.log(user)
          /* this.state.message = res.data.message */
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
.logo{
    width: 200px;
    height: 200px;
}

.avatar{
  width: 100px;
  height: 100px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  border-radius: 50px 50px 50px 50px;
  &:hover{
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

.invalid-feedback{
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
  margin-left:0;
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