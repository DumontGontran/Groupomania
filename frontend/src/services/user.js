import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user';

export default {
    header() {
        const token = localStorage.getItem('token')
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    },

    async getOneProfilUser(userId) {
        try {
            const res = await axios.get(API_URL + '/profil/' + userId, this.header())
            return res.data
        } catch (error) {
            return error
        }
    },
}