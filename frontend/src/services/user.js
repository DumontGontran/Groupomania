import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

export default {
    header() {
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user').split('"')[5]
            }
        }
    },

    async getOneUser(userId) {
        try {
            const res = await axios.get(API_URL + 'user/profil/' + userId, this.header());
            return res
        } catch (error) {
            return error
        }
    }
}