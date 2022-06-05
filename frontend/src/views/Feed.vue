<template>
    <Header />
    <section class="post_feed">
        <h2>Fil d'actualité</h2>
        <form class="flex flex_column" v-on:submit.prevent="sendPost" enctype="multipart/form-data">
            <label for="create_post">Créer une publication</label>
            <textarea type="text" rows="5" name="post_create" id="post_create" placeholder="Nouveau message ici"
                v-model="text" required></textarea>
            <div class="navForm flex flex_column flex_align--center">
                <input type="file" id="file" name="file" accept="image/png, image/jpeg, image/jpg" required
                    v-on:change="selectedFile" />
                <input type="submit" value="Publier" id="post_submit">
            </div>
        </form>
    </section>
    <article v-for="(post, index) in posts" :key="post.id">
        <div class="flex flex_column post_body" v-for="(user, index) in users" :key="user.id">
            <div>
                <div class="flex flex_row flex_between"
                    :title="'Créé le ' + dateFormat[index] + ' à ' + timeFormat[index]">
                    <p class="post_lastname post_firstname">{{ post.lastName }} {{ post.firstName }}</p>
                    <span v-if="!post.edit_mode">
                        <i class="fas fa-edit" id="comment_submit" v-show="users[0].role == 1 || post.userId == users[0].userId"
                            v-on:click.prevent="post.edit_mode = true; post.origin_value = post.text"></i>
                        <i class="fas fa-trash-alt" v-show="users[0].role == 1 || post.userId == users[0].userId"
                            v-on:click.prevent="deletePost(post.postId)"></i>
                    </span>
                </div>
                <div class="flex flex_row flex_between">
                    <p class="comment_comment" v-if="!post.edit_mode">{{ post.text }}</p>
                    <input v-show="users[0].role == 1 && post.edit_mode || post.userId == users[0].userId && post.edit_mode" type="text" class="comment_create"
                        id="comment_create" v-model="post.text" required>
                    <span v-if="post.edit_mode" class="flex flex_align--center">
                        <i class="fas fa-check" id="comment_submit" v-show="users[0].role == 1 || post.userId == users[0].userId"
                            v-on:click.prevent="post.edit_mode = false; modifyPost(post)"></i>
                        <i class="fas fa-times" id="comment_submit" v-show="users[0].role == 1 || post.userId == users[0].userId"
                            v-on:click.prevent="post.edit_mode = false; post.text = post.origin_value"></i>
                    </span>
                </div>
            </div>
            <img class="post_image flex" :src="post.file" alt="image de publication">
            <div class="flex flex_column">
                <div class="flex flex_row flex_between post_foot">
                    <form class="comment_form" enctype="application/json">
                        <input type="text" name="create_comment" id="comment_create"
                            placeholder="Nouveau commentaire ici" v-model="comment" />
                        <i class="fas fa-share" id="comment_submit" v-on:click.prevent="sendComment(post)"></i>
                    </form>
                </div>
            </div>
            <div class="flex flex_column" v-for="(comment, index) in comments" :key="comment.id">
                <div v-if="post.postId == comment.postId">
                    <div class="flex flex_row flex_between comment"
                        :title="commentDateFormat[index] + ' à ' + commentTimeFormat[index]">
                        <p class="comment_lastname comment_firstname">{{ comment.lastName }} {{ comment.firstName }}</p>

                        <span v-if="!comment.edit_mode">
                            <i class="fas fa-edit" id="comment_submit" v-show="users[0].role == 1 || comment.userId == users[0].userId"
                                v-on:click.prevent="comment.edit_mode = true; comment.origin_value = comment.comment"></i>
                            <i class="fas fa-trash-alt" v-show="users[0].role == 1 || comment.userId == users[0].userId"
                                v-on:click.prevent="deleteComment(comment.commentId)"></i>
                        </span>
                    </div>
                    <div class="flex flex_row flex_between">
                        <p class="comment_comment" v-if="!comment.edit_mode">{{ comment.comment }}</p>
                        <input v-show="users[0].role == 1 && comment.edit_mode || comment.userId == users[0].userId && comment.edit_mode" type="text" class="comment_create"
                            id="comment_create" v-model="comment.comment">
                        <span v-if="comment.edit_mode" class="flex flex_align--center">
                            <i class="fas fa-check" id="comment_submit" v-show="users[0].role == 1 || comment.userId == users[0].userId"
                                v-on:click.prevent="comment.edit_mode = false; modifyComment(comment)"></i>
                            <i class="fas fa-times" id="comment_submit" v-show="users[0].role == 1 || comment.userId == users[0].userId"
                                v-on:click.prevent="comment.edit_mode = false; comment.comment = comment.origin_value"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </article>
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
            users:[],
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
        this.users = await UserService.getOneProfilUser()

        this.posts = await UserService.getAllPost()

        this.comments = await UserService.getAllCommentsByPost()
    },
    methods: {
        selectedFile(event) {
            this.file = event.target.files[0]
        },
        async sendPost() {
            await UserService.createPost(this.text, this.file)
        },
        async modifyPost(post) {
            await UserService.updateOnePost(post.postId, post.text)
        },
        async deletePost(postId) {
            await UserService.deleteOnePost(postId)
        },
        async sendComment(post) {
            await UserService.createComment(this.comment, post.postId)
        },
        async modifyComment(comment) {
            await UserService.updateOneComment(comment.commentId, comment.comment)
        },
        async deleteComment(commentId) {
            await UserService.deleteOneComment(commentId)
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

    &-share {
        margin-left: auto;
        padding: 10px 10px;
        cursor: pointer;

        &:hover {
            color: darkblue;
        }
    }

    &-trash-alt {
        margin-left: auto;
        padding: 10px 10px;
        padding-right: 14px;
        cursor: pointer;
        color: red;
    }

    &-check::before {
        color: green;
    }

    &-times::before {
        color: red;
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
    border-top: 1px solid black;

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
        margin-right: auto;
        margin-bottom: 0;
    }

    &_comment {
        font-weight: normal;
        margin: 0;
        padding-top: 0;
        margin-bottom: 10px;
        padding-left: 10px;
        text-align: left;
    }

}

#comment {
    &_create {
        width: 280px;
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 10px;
    }

    &_submit {
        color: black;
        font-weight: bold;
        width: 20px;
        height: 20px;
        margin-left: auto;

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
        width: 250px;
        font-weight: bold;
    }

    &_lastname {
        text-justify: center;
        margin-top: 10px;
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
        padding-left: 10px;
        margin-bottom: 10px;
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