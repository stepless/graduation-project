<template>
    <div class="page">
        <Header />
        <router-view></router-view>
        <ToTop />
        <Footer />
    </div>
</template>
<script>
import Header from "../components/header.vue";
import ToTop from "../components/toTop.vue"
import Footer from "../components/footer.vue";

export default {
    components:{Header,ToTop,Footer},
}
</script>

<style scoped>
</style>