const yup = require('yup');

module.exports = {
    createPost: yup.object({
        text: yup.string().max(100).required()
    }),

    modifyPost: yup.object({
        text: yup.string().max(100).required()
    }),

    createComment: yup.object({
        comment: yup.string().max(100).required()
    }),

    modifyComment: yup.object({
        comment: yup.string().max(100).required()
    }),
};