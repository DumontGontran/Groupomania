<template>
    <Header />
    <PasswordForm />
</template>
<script>
import Header from "../components/Header.vue"
import PasswordForm from "../components/Password.vue"
export default {
    name: "PasswordView",
    components: {
        Header,
        PasswordForm
    }
}
</script>
