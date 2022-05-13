<template>
  <header class="flex flex-row flex-between">
    <img class="logo" src="../assets/logo/icon-left-font.svg" alt="Logo Groupomania"/>
    <ul class="flex flex-row">
      <li><router-link class="navLink" to="/public_feed">Fil d'actualité</router-link></li>
      <li><router-link class="navLink" to="/personal_feed">Fil personnel</router-link></li>
      <li><router-link class="navLink" to="/profil">Profil</router-link></li>
      <li><router-link class="navLink" to="/login">Déconnexion</router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
header{
border-bottom: 1px solid black;
}

.logo{
    width: 150px;
    height: 150px;
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
    text-decoration-thickness: 50%;
  }
}
</style>