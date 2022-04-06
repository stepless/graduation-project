<template>
    <transition>
        <div @click="toTop" v-show="toShow" class="me-to-top">
            <i class="iconfont icon-xiangshang"></i>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return {
            "toShow":false,
        }
    },
    methods:{
        toTop(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            this.toShow = false;
        },
        needToTop(){
            let curHeight = document.documentElement.scrollTop || document.body.scrollTop;
            if(curHeight > 400){
                this.toShow = true;
            }else{
                this.toShow = false;
            }
        }
    },
    mounted(){
        this.$nextTick(function(){
            window.addEventListener('scroll',this.needToTop)
        })
    }
}
</script>

<style scoped>
.me-to-top{
    background-color: #fff;
    position: fixed;
    right: 100px;
    bottom:100px;
    width:40px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    transition:.3s;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    z-index: 8;
}
.me-to-top i{
    color:#53a6dd;
    display: block;
    line-height: 40px;
    text-align: center;
    font-size:18px;
}
</style>