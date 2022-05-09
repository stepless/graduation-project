<template>
    <div class="whale">
        <img class="whale1" src="../../assets/img/鲸鱼2.png" />
    </div>
</template>
<script>
import roll from "../../mixins/roll.js"
export default {

    mixins:[roll],
    
    mounted(){
        const whale = document.querySelector('.whale1');
        window.addEventListener("scroll",()=>{
            this.monitorScroll(whale,900,500)
        })
    },
}
</script>

<style scoped>
    .block{
        display: block !important;
    }
    .whale{
        position:relative;
        z-index: 1;
    }
    .whale .whale1{
        display: none;
        position: absolute;
        width:1000px;
        left:0px;
        top: 960px;
        animation:1.5s ease-in-out 1 forwards swim;
    }
    @keyframes swim{
        0%{
            transform: translate(-100%,0);
        }100%{
            transform: translate(-20%,-60%);
        }
    }
</style>