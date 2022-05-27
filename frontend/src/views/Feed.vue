<template>
    <Header />
    <Feed />
</template>
<script>
import Header from "../components/Header.vue"
import Feed from "../components/Feed.vue"
export default {
    name: "FeedView",
    components: {
        Header,
        Feed
    }
}
</script>
