const yup = require('yup');

module.exports = {
    post: yup.object({
        text: yup.string().required(),
        file: yup.string().required(),
        userId: yup.string().required(),
        like: yup.string().required()
    }),
};