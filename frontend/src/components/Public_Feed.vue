<template>
<h2>Fil d'actualité</h2>
<form class="flex flex_column">
<label for="create_post">Créer une publication</label>
<input type="text" name="create_post" id="create_post" placeholder="Tapez votre message ici">
<div class="navForm flex flex_row flex_between buttons_form">
  <input type="button" value="Ajouter image..." id="upload">
  <input type="submit" value="Publier" id="submit">
</div>
</form>
<section class="public_feed">

</section>
</template>

<script>
/* import axios from 'axios' */

export default {
  name: "Public_Feed",
  methods:{

  }
}
</script>

<style lang="scss" scoped>
h2 {
  text-decoration: underline;
  text-decoration-color: red;
  text-decoration-thickness: 20%;
}

form {
  margin: auto;
  padding: 0 0;
  border: 3px solid black;
  border-radius: 10px 10px 10px 10px;
  width: 600px;
}

label {
  padding-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  padding-bottom: 5px;
  text-align: center;
  font-weight: bold;
  color: red;
}

input {
  margin-left: 10px;
  margin-right: 10px;
}

.navForm {
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 60px;
  margin-bottom: 20px;
}

#create_post {
  &::placeholder {
    position: absolute;
    top: 0;
    left: 0;
  }
}

#submit {
  background-color: white;
  color: black;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px 5px 5px 5px;
  width: 150px;
  height: 25px;
  &:hover {
    border: 1px solid red;
    color: red;
    box-shadow: 0px 1px 10px red;
  }
}

#upload {
  background-color: pink;
  color: black;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 5px 5px 5px 5px;
  width: 150px;
  height: 25px;
  &:hover {
    background-color: white;
    border: 1px solid red;
    color: red;
    box-shadow: 0px 1px 10px red;
  }
}
</style>