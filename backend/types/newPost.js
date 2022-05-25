class newPost {
    constructor(options){
       this.text = options.text || "";
       this.file = options.file || "";
       this.userId = options.userId || "";
       this.like = options.like || "";
    }
 }

 module.exports = newPost;