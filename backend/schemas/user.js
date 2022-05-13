const yup = require('yup');

module.exports = {
    register: yup.object({
        lastName: yup.string().required(),
        firstName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().min(8).max(16).required(),
        confirmPassword: yup.string().min(8).max(16).required()
    })
};