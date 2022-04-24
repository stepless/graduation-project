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
header.nav >>> nav.item2 ul li:nth-of-type(2) a{
  color:#d15431;
}
</style>