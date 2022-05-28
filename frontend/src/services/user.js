import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export default {
    header() {
        const token = localStorage.getItem('token')
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },

    async updateOneProfilUser(users, userId) {
        try {
            const user = {
                'lastName': users.lastName,
                'firstName': users.firstName
            }

            const res = await axios.patch(`${API_URL}/user/profil/${userId}`, user, this.header())
            return res.data
        }
        catch (error) {
            return error
        }
    },

    async getOneProfilUser(userId) {
        try {
            const res = await axios.get(`${API_URL}/user/profil/${userId}`, this.header())
            return res.data
        } catch (error) {
            return error
        }
    },

    async createPost(text, file, userId) {
        try {
            let header = this.header()
            header.headers['content-type'] = 'multipart/form-data'

            const newPost = new FormData()
            newPost.append('text', text)
            newPost.append('file', file)
            newPost.append('userId', parseInt(userId))

            const res = await axios.post(`${API_URL}/public_feed/`, newPost, header)
            return res.data
        } catch (error) {
            return error
        }
    }
}