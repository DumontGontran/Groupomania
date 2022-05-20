import axios from "axios";

const API_URL = "http://localhost:3000/api/";

export default {
    header() {
        return {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('user').split('"')[5]
            }
        }
    },

    async get(id) {
        try {
            const res = await axios.get(API_URL + "user/profil/" + id, this.header());
            console.log(res);
            this.user = res.data;
            this.state.lastName = this.user.lastName
            this.state.firstName = this.user.firstName
            this.state.email = this.user.email
        } catch (error) {
            return error;
        }
    }
}