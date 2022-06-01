class createPost {
    constructor(options){
       this.text = options.text || "";
       this.file = options.file || "";
       this.userId = options.userId || "";
    }
 }

 module.exports = createPost;