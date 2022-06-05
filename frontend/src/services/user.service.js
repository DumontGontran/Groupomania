import router from '../router';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'

const userId = localStorage.getItem('userId')
const token = localStorage.getItem('token')

export default {
    header() {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },

    async registerOneProfilUser(state) {
        try {
            const user = {
                'lastName': state.lastName,
                'firstName': state.firstName,
                'email': state.email,
                'password': state.password,
                'confirmPassword': state.confirmPassword
            }

            const res = await axios.post(`${API_URL}/user/register`, user)
            return res.data,
                state.message = 'Inscription réussie !',
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
        }
        catch (error) {
            return error,
                state.message = error.response.data.message
        }
    },

    async loginOneProfilUser(state) {
        try {
            const user = {
                'email': state.email,
                'password': state.password
            }

            const res = await axios.post(`${API_URL}/user/login`, user)
            return res.data,
                console.log(res),
                console.log(user),
                localStorage.setItem('userId', parseInt(res.data.userId)),
                localStorage.setItem('token', res.data.token),
                state.message = 'Connexion réussie !',
                setTimeout(() => {
                    userId,
                    token,
                    router.push('/feed')
                }, 1000)
        }
        catch (error) {
            return error,
                state.message = error.response.data.message
        }
    },

    async updateOneProfilUser(users) {
        try {
            const user = {
                'lastName': users.lastName,
                'firstName': users.firstName
            }

            const res = await axios.patch(`${API_URL}/user/profil/${userId}`, user, this.header())
            return res.data,
                console.log(res),
                console.log(user),
                setTimeout(() => {
                    router.go(0)
                }, 1000)
        }
        catch (error) {
            return error
        }
    },

    async updateOnePasswordUser(password, confirmPassword) {
        try {
            const userPassword = {
                'password': password,
                'confirmPassword': confirmPassword
            }

            const res = await axios.patch(`${API_URL}/user/profil/password/${userId}`, userPassword, this.header())
            return res.data,
                setTimeout(() => {
                    router.go(0)
                }, 1000)
        }
        catch (error) {
            return error
        }
    },

    async getOneProfilUser() {
        try {
            const res = await axios.get(`${API_URL}/user/profil/${userId}`, this.header())
            return res.data
        } catch (error) {
            return error,
                router.push('/login')
        }
    },

    async createPost(text, file) {
        try {
            let header = this.header()
            header.headers['content-type'] = 'multipart/form-data'

            const newPost = new FormData()
            newPost.append('text', text)
            newPost.append('file', file)
            newPost.append('userId', parseInt(userId))

            const res = await axios.post(`${API_URL}/feed/`, newPost, header)
            return res.data,
                router.go(0)
        } catch (error) {
            return error
        }
    },

    async getAllPost() {
        try {
            const res = await axios.get(`${API_URL}/feed/`, this.header())
            return res.data
        } catch (error) {
            return error,
                router.go(0)
        }
    },

    async createComment(comment, postId) {
        try {
            let header = this.header()
            header.headers['content-type'] = 'application/json'

            const newComment = {
                'comment': comment,
                'userId': parseInt(userId),
                'postId': postId
            }

            console.log('Nouveau Commentaire', newComment)

            const res = await axios.post(`${API_URL}/feed/comment`, newComment, header)
            return res.data,
                router.go(0)
        } catch (error) {
            return error
        }
    },

    async updateOneComment(commentId, comment) {
        try {
            let header = this.header()
            header.headers['content-type'] = 'application/json'

            const updateComment = {
                'comment': comment,
                'commentId': commentId
            }

            console.log('Modification du Commentaire', updateComment)

            const res = await axios.patch(`${API_URL}/feed/comment/${commentId}`, updateComment, header)
            return res.data
        } catch (error) {
            return error,
                router.go(0)
        }
    },

    async updateOnePost(postId, text) {
        try {
            let header = this.header()
            header.headers['content-type'] = 'application/json'

            const updatePost = {
                'text': text,
                'postId': postId
            }

            console.log('Modification de la publication', updatePost)

            const res = await axios.patch(`${API_URL}/feed/${postId}`, updatePost, header)
            return res.data
        } catch (error) {
            return error,
                router.go(0)
        }
    },

    async getAllCommentsByPost() {
        try {
            const res = await axios.get(`${API_URL}/feed/comment/`, this.header())
            return res.data
        } catch (error) {
            return error,
                router.go(0)
        }
    },

    async deleteOnePost(postId) {
        try {
            let header = this.header()
            header.headers['content-type'] = 'application/json'

            const res = await axios.delete(`${API_URL}/feed/${postId}`, header)
            return res.data,
                router.go(0)
        } catch (error) {
            return error
        }
    },

    async deleteOneComment(commentId) {
        try {
            let header = this.header()
            header.headers['content-type'] = 'application/json'
            const res = await axios.delete(`${API_URL}/feed/comment/${commentId}`, header)
            return res.data,
                router.go(0)
        } catch (error) {
            return error
        }
    },

    async deleteOneUser() {
        try {
            let header = this.header()
            header.headers['content-type'] = 'application/json'
            const res = await axios.delete(`${API_URL}/user/profil/${userId}`, header)
            return res.data,
                localStorage.clear(),
                router.push('/register')
        } catch (error) {
            return error
        }
    },
}