<template>
    <Header />
    <section class="post_feed">
        <h2>Fil d'actualité</h2>
        <form class="flex flex_column" v-on:submit.prevent="sendPost" enctype="multipart/form-data">
            <label for="create_post">Créer une publication</label>
            <textarea type="text" rows="5" name="create_post" id="create_post" placeholder="Tapez votre message ici"
                v-model="text"></textarea>
            <div class="navForm flex flex_column flex_align--center">
                <input type="file" id="file" name="file" accept="image/png, image/jpeg, image/jpg"
                    v-on:change="selectedFile" />
                <input type="submit" value="Publier" id="submit">
            </div>
        </form>
    </section>
    <section v-for="(post, index) in posts" :key="post.id">
        <div class=" flex flex_column post_head">
            <div class="flex flex_row">
                <p class="post_lastname">{{ post.lastName }}</p>
                <p class="post_firstname">{{ post.firstName }}</p>
            </div>
            <p class="post_date">Le {{ dateFormat[index] }} à {{ timeFormat[index] }}</p>
        </div>
        <div class="flex flex_column post_body">
            <p class="post_text">{{ post.text }}</p>
            <img class="post_image flex" :src="post.file" alt="image de publication">
            <div class="flex flex_column flex_align--center flex_around post_foot">
                <form class="flex flex_column comment_form" v-on:submit.prevent="sendComment(post.postId)" enctype="application/x-www-form-urlencoded">
                    <input type="text" name="create_comment" id="create_comment" placeholder="Commentez ici"
                        v-model="comment">
                    <input class="post_comment_create" id="submit_comment" value="Commenter" type="submit">
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import Header from '../components/Header'
import UserService from '../services/user.service'

export default {
    name: "Feed",
    components: {
        Header
    },
    data() {
        return {
            posts: [],
            text: '',
            file: '',
            comment: ''
        }
    },
    computed: {
        dateFormat() {
            return this.posts.map(p => p.date.split(' ')[0].split('-').reverse().join('/'))
        },
        timeFormat() {
            return this.posts.map(p => p.date.split(' ')[1].split('.')[0])
        }
    },
    async mounted() {
        this.posts = await UserService.getAllPost()
        console.log('GET POSTS', this.posts)
    },
    methods: {
        selectedFile(event) {
            this.file = event.target.files[0]
            console.log('File to Send', this.file)
        },
        async sendPost() {
            await UserService.createPost(this.text, this.file)
        },
        async sendComment(postId) {
            console.log('postId', postId)
            await UserService.createComment(this.comment, postId)
        }
    }
}
</script>

<style lang="scss" scoped>
h2 {
    color: black;
    text-decoration: underline;
    text-decoration-color: red;
    text-decoration-thickness: 20%;
}

form {
    margin: auto;
    margin-bottom: 20px;
    padding: 0 0;
    border: 3px solid black;
    border-radius: 10px 10px 10px 10px;
    width: 350px;
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

input,
textarea {
    margin-left: 10px;
    margin-right: 10px;
}

textarea {
    min-width: 325px;
    max-width: 325px;
    height: 200px;
    min-height: 100px;
    max-height: 200px;
}

.navForm {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
}

.comment_form{
    border: none;
    margin-bottom: 0;
}
#create_post {
    &::placeholder {
        position: absolute;
        top: 0;
        left: 0;
    }
}

#create_comment {
    width: 330px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
}

#submit_comment {
    margin-bottom: 20px;
}

#submit,
#submit_comment {
    background-color: white;
    color: black;
    font-weight: bold;
    border: 1px solid black;
    border-radius: 5px 5px 5px 5px;
    width: 150px;
    height: 25px;
    margin-left: auto;
    margin-right: auto;

    &:hover {
        border: 1px solid darkblue;
        color: darkblue;
        box-shadow: 0px 1px 10px darkblue;
    }
}

#submit {
    margin-top: 20px;
}

.post {
    &_feed {
        border-bottom: 1px solid black;
        margin-bottom: 20px;
    }

    &_head {
        margin: auto;
        padding: 0 0;
        border: 3px solid black;
        border-radius: 10px 10px 10px 10px;
        width: 200px;
        font-weight: bold;
    }

    &_lastname {
        margin-left: 10px;
        margin-right: 10px;
    }

    &_date {
        margin-top: 0;
        margin-left: 10px;
        text-align: left;
        font-weight: normal;
    }

    &_body {
        position: relative;
        top: -3px;
        left: 0;
        margin: auto;
        margin-bottom: 20px;
        padding: 0 0;
        border: 3px solid black;
        border-radius: 10px 10px 10px 10px;
        width: 350px;
        font-weight: bold;
    }

    &_text {
        margin: 0;
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid black;
    }

    &_image {
        margin-left: auto;
        margin-right: auto;
        width: 350px;
        height: 350px;
    }

    &_foot {
        border-top: 1px solid black;
    }

    &_usersLiked {
        visibility: hidden;
    }
}
</style>