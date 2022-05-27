const yup = require('yup');

module.exports = {
    post: yup.object({
        text: yup.string(),
        file: yup.string(),
        userId: yup.number().integer()
    }),
};