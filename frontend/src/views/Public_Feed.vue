<template>
    <Header />
    <Public_Feed />
</template>
<script>
import Header from "../components/Header.vue"
import Public_Feed from "../components/Public_Feed.vue"
export default {
    name: "Public_FeedView",
    components: {
        Header,
        Public_Feed
    }
}
</script>
