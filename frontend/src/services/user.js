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

    async getOneUser(userId) {
        try {
            const res = await axios.get(API_URL + '/user/profil/' + userId, this.header())
            return res.data
        } catch (error) {
            return error
        }
    },

    async updateOneUser(){
        try{
            let userId = localStorage.getItem('userId')
            const res = await axios.put(API_URL + '/user/profil/' + userId, this.header())
            return console.log(res)
        }
        catch(error){
            return console.log(error)
        }
    }
}