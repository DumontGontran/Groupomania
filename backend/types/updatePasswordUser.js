class UpdatePasswordUser {
    constructor(options){
       this.password = options.password || "";
       this.confirmPassword = options.confirmPassword || "";
    }
 }

 module.exports = UpdatePasswordUser;