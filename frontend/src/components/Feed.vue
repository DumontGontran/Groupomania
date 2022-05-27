<template>
<section>
<h2>Fil d'actualité</h2>
<form class="flex flex_column" v-on:submit.prevent="sendPost" enctype="multipart/form-data">
<label for="create_post">Créer une publication</label>
<textarea type="text" rows="5" name="create_post" id="create_post" placeholder="Tapez votre message ici" v-model="text"></textarea>
<div class="navForm flex flex_row flex_between buttons_form">
  <label for="file" hidden>Sélectionnez une image à publier</label>
  <input type="file" id="file" name="file" accept="image/png, image/jpeg, image/jpg" v-on:change="selectedFile"/>
  <input type="submit" value="Publier" id="submit">
</div>
</form>
</section>
<!-- <section class="flex flex_column feed">
<div class="flex flex_column">
  <div>
<span v-model="user.lastName"></span> lastName of post creator
<span v-model="user.firstName"></span> firstName of post creator
  </div>
<p v-model="post.date"></p> Date of post
</div>
<div>
<p v-model=""></p> text of post
<img v-model=""> file of post
</div>
</section> -->
<section class="flex flex_column">

</section>
</template>

<script>
import axios from 'axios'

export default {
  name: "Feed",
  data() {
    return{
      text: '',
      file: '',
      like: 0
    }
  },
  async mounted(){

  },
  methods:{
    selectedFile(event){
      this.file = event.target.files[0]
      console.log('File to Send', this.file)
    },
    sendPost(){
      const userId = localStorage.getItem('userId')
      const token = localStorage.getItem('token')

      const newPost = new FormData()
      newPost.append('text', this.text)
      newPost.append('file', this.file)
      newPost.append('userId', parseInt(userId))

      axios
        .post('http://localhost:3000/api/public_feed/', newPost, {
          headers: {
            'Authorization': 'Bearer ' + token,
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log('API Response', res)
          console.log('Post Send', newPost)
        })
        .catch(error => {
          console.log('API Error', error)
          console.log('Post to Send', newPost)
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