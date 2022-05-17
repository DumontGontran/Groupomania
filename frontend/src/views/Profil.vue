<template>
    <Header />
    <ProfilForm />
</template>
<script>
import Header from "../components/Header.vue"
import ProfilForm from "../components/Profil.vue"
export default {
    name: "ProfilView",
    components: {
        Header,
        ProfilForm
    }
}
</script>
