<template>
    <div class="page">
        <Header />
        <div class="contains">
            <div class="fish">
                <ul>

                </ul>
            </div>
        </div>
    </div>

</template>

<script>
import Header from "../components/header.vue"
export default {
    components:{Header,},
    
}
</script>


<style scoped>
header.nav{
    background-color:rgba(0,0,0,0);
    box-shadow: none;
}
header.nav >>> .item2 ul li a{
  color:white;
}
header.nav >>> nav.item2 ul li:nth-of-type(3) a{
  color:#d15431;
}
.contains{
    padding-top:120px;
    background-color:rgba(5, 24, 49, 0.8);
}

</style>