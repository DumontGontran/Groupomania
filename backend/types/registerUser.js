class RegisterUser {
    constructor(options){
       this.firstName = options.firstName || "";
       this.lastName = options.lastName || "";
       this.email = options.email ? options.email.toLowerCase().split(" ").join("") : "";
       this.password = options.password || "";
    }
 }

 module.exports = RegisterUser;