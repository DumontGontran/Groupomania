<template>
    <Header />
    <LoginForm />
</template>
<script>
import Header from "../components/Header.vue";
import LoginForm from "../components/Login.vue";
export default {
    name: "LoginView",
    components: {
        Header,
        LoginForm
    }
}
</script>
