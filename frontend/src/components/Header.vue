<template>
  <header class="flex flex_row flex_between">
    <div class="flex flex_row flex_align--center">
    <img class="logo" src="../assets/logo/icon.svg" alt="Logo Groupomania"/>
    <h1>Groupomania</h1>
    </div>
    <ul class="flex flex_row flex_align--center">
      <li><router-link class="navLink" to="/public_feed">Fil d'actualité</router-link></li>
      <li><router-link class="navLink" to="/personal_feed">Fil personnel</router-link></li>
      <li><router-link class="navLink" to="/profil">Profil</router-link></li>
      <li><router-link class="navLink" to="/login" v-on:click.prevent="logout">Déconnexion</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Content_Header",
  methods:{
    logout(){
      localStorage.clear()
    }
  }
};
</script>

<style lang="scss" scoped>
header{
border-bottom: 1px solid black;
}

.logo{
    width: 100px;
    height: 80px;
}

h1 {
  font-size: 20px;
  color: red;
}

 ul {
  list-style: none;
}

.navLink{
  margin: 0;
  padding:0;
  margin-right: 20px;
  margin-left: 50px;
  text-decoration: none;
  color: black;
  &:hover{
    text-decoration: underline;
    text-decoration-color: red;
    text-decoration-thickness: 30%;
  }
}
</style>