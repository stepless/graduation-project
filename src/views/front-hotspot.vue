<template>
    <div class="page">
        <Header />
        <div class="main">
            main
        </div>
    </div>
</template>
<script>
import Header from "../components/header.vue";
export default {
    components:{Header},
}
</script>

<style scoped>
    .main{
        padding-top:80px;
    }
</style>