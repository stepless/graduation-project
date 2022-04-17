<template>
    <div class="page">
        <Header />
        <router-view></router-view>
        <ToTop />
    </div>
</template>
<script>
import Header from "../components/header.vue";
import ToTop from "../components/toTop.vue"

export default {
    components:{Header,ToTop},
}
</script>

<style scoped>
</style>