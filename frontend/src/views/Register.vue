<template>
  <Header />
  <RegisterForm />
</template>
<script>
import Header from "../components/Header.vue";
import RegisterForm from "../components/Register.vue";
export default {
  name: "RegisterView",
  components: {
    Header,
    RegisterForm
  }
};
</script>
