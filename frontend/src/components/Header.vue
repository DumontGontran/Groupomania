<template>
  <header class="flex flex_row flex_between">
    <router-link to="/feed" class="flex flex_row flex_align--center navLink--logo">
    <img class="logo" src="../assets/logo/icon.svg" alt="Logo Groupomania"/>
    <h1>Groupomania</h1>
    </router-link>
    <ul class="flex flex_column">
      <li><router-link class="navLink" to="/feed"><i class="fas fa-comments fa-xl"></i></router-link></li>
      <li><router-link class="navLink" to="/profil"><i class="fas fa-user-circle fa-xl"></i></router-link></li>
      <li><router-link class="navLink" to="/login" v-on:click.prevent="logout"><i class="fas fa-sign-out-alt fa-xl"></i></router-link></li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods:{
    logout(){
      localStorage.clear()
    }
  }
};
</script>

<style lang="scss" scoped>
header{
border-bottom: 2px solid black;
}

.logo{
    width: 100px;
    height: 80px;
}

h1 {
  font-size: 20px;
  color: red;
  @media screen and (max-width: 460px) {
    display: none;
  }
}

 ul {
  list-style: none;
}

li {
  text-align: right;
  padding-bottom: 10px;
}

.fa {
    &-sign-out-alt {
        margin-left: auto;
        cursor: pointer;

        &:hover {
            color: red;
        }
    }
    &-user-circle, &-comments{
      margin-left: auto;
        cursor: pointer;

        &:hover {
            color: darkblue;
        }
    }
}

.navLink{
  margin: 0;
  padding:0;
  margin-right: 20px;
  margin-left: 50px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  &--logo{
    text-decoration: none;
  }
}
</style>