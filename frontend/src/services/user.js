import router from '@/router';
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

            const res = await axios.post(`${API_URL}/user/register`, user, this.header())
            return res.data,
                state.message = 'Inscription réussie !',
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
        }
        catch (error) {
            return error,
                console.log(error),
                state.message = error.response.data.message
        }
    },

    async loginOneProfilUser(state) {
        try {
            const user = {
                'email': state.email,
                'password': state.password
            }

            const res = await axios.post(`${API_URL}/user/login`, user, this.header())
            return res.data,
                console.log(res),
                console.log(user),
                localStorage.setItem('userId', parseInt(res.data.userId)),
                localStorage.setItem('token', res.data.token),
                state.message = 'Connexion réussie !',
                setTimeout(() => {
                    router.push('/feed')
                }, 1000)
        }
        catch (error) {
            return error,
                console.log(error),
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
            return error,
            console.log(error)
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
            return error
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

            const res = await axios.post(`${API_URL}/public_feed/`, newPost, header)
            return res.data,
                router.go(0)
        } catch (error) {
            return error
        }
    }
}