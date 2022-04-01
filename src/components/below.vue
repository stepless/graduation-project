<template>
    <div class="below">
        <div class="contains">
            <img src="../assets/页尾.gif" />
            <div class="content">
                <ul>
                    <li v-for="(link,index) in this.links" :key="index">
                        <a :href="link">{{ index }}</a>
                    </li>
                </ul>
                <div class="relation">
                    25
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "@/assets/css/header.css"
export default {
    data(){
        return {
            links : {
                "首页" : "/",
                "新闻热点" : "/",
                "濒危海洋鱼类" : "/",
                "法律条例" : "/law",
                "关于我们" : "/about",
            },
        }
    },
}
</script>
<style>
.below{
    position: relative;
    z-index:7;
}
.below .contains{
    position: relative;
}
.below .contains .content{
    position: absolute;
    color:white;
    display: flex;
    justify-content:space-between;
    width: 100%;
    left:0;
    bottom:72px;
}
.below .contains .content ul{
    display: flex;
    margin-left: 200px;
}
.below .contains .content ul li{
    margin-right: 30px;
}
.below .contains .content a{
    color:white;
}
.below .contains .content a:hover{
    color:rgb(232, 102, 55);
}
</style>