<template>
    <Header />
    <section class="post_feed">
        <h2>Fil d'actualité</h2>
        <form class="flex flex_column" v-on:submit.prevent="sendPost" enctype="multipart/form-data">
            <label for="create_post">Créer une publication</label>
            <textarea type="text" rows="5" name="post_create" id="post_create" placeholder="Tapez votre message ici"
                v-model="text"></textarea>
            <div class="navForm flex flex_column flex_align--center">
                <input type="file" id="file" name="file" accept="image/png, image/jpeg, image/jpg"
                    v-on:change="selectedFile" />
                <input type="submit" value="Publier" id="post_submit">
            </div>
        </form>
    </section>
    <section v-for="(post, index) in posts" :key="post.id">
        <div class=" flex flex_column post_head">
            <div class="flex flex_row">
                <p class="post_lastname">{{ post.lastName }}</p>
                <p class="post_firstname">{{ post.firstName }},</p>
            </div>
            <p class="post_date">le {{ dateFormat[index] }} à {{ timeFormat[index] }}</p>
            <div class="flex flex_row">
                <i class="fas fa-edit fa-2x"></i>
                <i class="fas fa-trash-alt fa-2x"></i>
            </div>
        </div>
        <div class="flex flex_column post_body">
            <p class="post_text">{{ post.text }}</p>
            <img class="post_image flex" :src="post.file" alt="image de publication">
            <div class="flex flex_row flex_between post_foot">
                <form class="comment_form" enctype="application/json">
                    <textarea type="text" name="create_comment" id="comment_create" placeholder="Commentez ici"
                        v-model="comment"></textarea>
                    <i class="fas fa-share fa-xl" id="comment_submit" v-on:click.prevent="sendComment(post.postId)"></i>
                </form>
            </div>
            <div class="flex flex_column" v-for="(comment, index) in comments" :key="comment.id">
                <div v-if="post.postId == comment.postId">
                    <div class="flex flex_row comment">
                        <p class="comment_lastname">{{ comment.lastName }}</p>
                        <p class="comment_firstname">{{ comment.firstName }},</p>
                    </div>
                    <div class="flex flex_row">
                    <p class="comment_date">{{ commentDateFormat[index] }} à {{ commentTimeFormat[index] }}</p>
                        <i class="fas fa-edit fa-1x"></i>
                        <i class="fas fa-trash-alt fa-1x"></i>
                    </div>
                    <p class="comment_comment">{{ comment.comment }}</p>
                </div>
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
            comments: [],
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
        },
        commentDateFormat() {
            return this.comments.map(c => c.commentDate.split(' ')[0].split('-').reverse().join('/'))
        },
        commentTimeFormat() {
            return this.comments.map(c => c.commentDate.split(' ')[1].split('.')[0])
        }
    },
    async mounted() {
        this.posts = await UserService.getAllPost()
        console.log('GET POSTS', this.posts)

        this.comments = await UserService.getAllCommentsByPost()
        console.log('GET COMMENTS By Post', this.comments)
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
    background-color: #FFD7D7;
    border-radius: 10px 10px 10px 10px;
    width: 350px;
}

.fa {
    &-edit {
        margin-left: auto;
        padding: 10px 10px;
        cursor: pointer;

        &:hover {
            color: darkblue;
        }
    }

    &-trash-alt {
        padding: 10px 10px;
        margin-right: auto;
        cursor: pointer;

        &:hover {
            color: red;
        }
    }
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

.navForm {
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
}

.comment {
    border-top: 2px solid black;

    &_form {
        border: none;
        margin-bottom: 0;
    }

    &_lastname {
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        margin-bottom: 0;
    }

    &_firstname {
        margin-top: 10px;
        margin-bottom: 0;
    }

    &_date {
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 100px;
        margin-bottom: 0;
    }

    &_comment {
        border-top: 1px solid black;
        font-weight: normal;
        margin: 0;
        margin-bottom: 10px;
        padding-left: 10px;
        text-align: left;
    }

}

#comment {
    &_create {
        min-width: 290px;
        width: 290px;
        max-width: 290px;
        min-height: 20px;
        height: 60px;
        max-height: 60px;
        margin-top: 20px;
        margin-left: 10px;
        margin-bottom: 10px;
    }

    &_submit {
        position: relative;
        top: -40px;
        left: 0;
        color: black;
        font-weight: bold;
        width: 20px;
        height: 20px;
        margin-left: auto;
        margin-right: 10px;
        margin-bottom: 20px;
        cursor: pointer;

        &:hover {
            color: darkblue;
        }
    }
}

#post {
    &_submit {
        margin-top: 20px;
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

    &_create {
        min-width: 325px;
        max-width: 325px;
        height: 200px;
        min-height: 100px;
        max-height: 200px;

        &::placeholder {
            position: absolute;
            top: 0;
            left: 0;
        }
    }
}

.post {
    &_feed {
        border-bottom: 2px solid black;
        margin-bottom: 20px;
    }

    &_head {
        background-color: #FFD7D7;
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
        margin-bottom: 0;
    }

    &_firstname {
        margin-bottom: 0;
    }

    &_date {
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 10px;
        text-align: left;
    }

    &_body {
        background-color: #FFD7D7;
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
        margin-top: 10px;
        padding-left: 10px;
        text-align: left;
        font-weight: normal;
    }

    &_image {
        margin-left: auto;
        margin-right: auto;
        border-top: 1px solid black;
        width: 350px;
        height: 350px;
    }

    &_foot {
        border-top: 3px solid black;
    }
}
</style>