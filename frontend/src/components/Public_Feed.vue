<template>
<h2>Fil d'actualité</h2>
<form class="flex flex_column">
<label for="create_post">Créer une publication</label>
<textarea type="text" rows="5" name="create_post" id="create_post" placeholder="Tapez votre message ici" v-model="text"></textarea>
<div class="navForm flex flex_row flex_between buttons_form">
  <label for="file" hidden>Sélectionnez une image à publier</label>
  <input type="file" id="file" name="file" accept="image/*" v-on:change.prevent="selectedFile(event)"/>
  <input type="submit" value="Publier" id="submit" v-on:cliçk.prevent="sendPost">
</div>
</form>
<section class="public_feed">

</section>
</template>

<script>
import axios from 'axios'

export default {
  name: "Public_Feed",
  data() {
    return{
      text: '',
      file: '',
      like: '0'
    }
  },
  methods:{
    selectedFile(event){
      this.file = event.target.files[0]
    },
    sendPost(){
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')

      const newPost = {
        'text': this.text,
        'file': this.file,
        'userId': userId,
        'like': this.like
      }

      console.log('Post to send', newPost)

      axios
        .post('http://localhost:3000/api/public_feed/post', newPost, {
          headers: {
            'Authorization': 'Bearer ' + token
          }
        })
        .then(res => {
          console.log('API Response', res)
          console.log('Post Send', post)
        })
        .catch(error => {
          console.log('API Error', error)
          console.log('Post to Send', post)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
h2 {
  color:black;
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
  text-align: left;
  font-weight: bold;
  color: black;
}

input, textarea {
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
    border: 1px solid darkblue;
    color: darkblue;
    box-shadow: 0px 1px 10px darkblue;
  }
}
</style>