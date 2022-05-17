<template>
    <Header />
    <Personal_Feed />
</template>
<script>
import Header from "../components/Header.vue"
import Personal_Feed from "../components/Personal_Feed.vue"
export default {
    name: "Personal_FeedView",
    components: {
        Header,
        Personal_Feed
    }
}
</script>
