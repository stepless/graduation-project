<template>
    <div class="page">
        <Header />
        <div class="topImg">
            <img class="massif" src="../assets/img/山.gif">
            <div class="ripple-ya">
                <img class="ripple" src="../assets/img/水波.gif">
                <img class="ya1 ya" src="../assets/img/小黄鸭1.png">
                <img class="ya2 ya" src="../assets/img/小黄鸭2.png">
            </div>
            <div class="topText">
                <img src="@/assets/img/txt.png">
            </div>
        </div>
        <Shallow />
        <Rubbish />
        <Whale />
        <Seabed />
        <Below />
        <Data/>
    </div>
</template>

<script>
import Header from "../components/header.vue";
import Shallow from "../components/sea/shallow.vue";
import Rubbish from "../components/sea/rubbish.vue";
import Whale from "../components/sea/whale.vue";
import Seabed from "../components/sea/seabed.vue";
import Below from "../components/sea/below.vue";
import Data from "./front-data.vue";
export default {
    data(){
        return {
            documentWidth : document.body.clientWidth
        }
    },
    components:{Header,Shallow,Rubbish,Whale,Seabed,Below,Data},
    computed:{
        left(){
            return this.documentWidth/2;
        }
    },
    mounted() {
        const ya1 = document.querySelector('.ya1');
        const ya2 = document.querySelector('.ya2');
        ya1.style.left = this.left + 'px';
        ya2.style.left = this.left + 'px';
        window.addEventListener("resize",() => {
            return (() => {
                this.documentWidth = document.body.clientWidth;
                ya1.style.left = this.left + 'px';
                ya2.style.left = this.left + 'px';
            })();
        })
    },
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
header.nav >>> nav.item2 ul li:nth-of-type(1) a{
  color:#d15431;
}
.topImg{
    background: linear-gradient(0deg, rgba(133,221,201,1) 55%, rgba(57,133,206,1) 100%);
    position: relative;
}
.topImg .topText{
    position: absolute;
    width:100%;
    z-index: 9;
    top:0px;
    left:0px;
}
.topImg .topText img{
    display: block;
    width:1300px;
    margin-left: auto;
    margin-right: auto;
    margin-top:130px;
}
.topImg .ripple-ya{
    position: relative;
}
.topImg .ripple-ya .ripple{
    width:100%;
    margin-top:-4px;
    height: 226px;
}
.topImg .ripple-ya .ya{
    width:80px;
    height:80px;
    position:absolute;
    top:10px;
}
.topImg .ripple-ya .ya1{
    animation:2s infinite alternate forwards floating1;
}
.topImg .ripple-ya .ya2{
    animation:2.5s ease-in-out infinite alternate forwards floating2;
}   
@keyframes floating1{
    0%{
        transform:translateX(-100px) rotateZ(0deg) rotateY(0deg);
    }20%{
        transform:translateX(-100px) rotateZ(18deg)  rotateY(10deg);
    }
    75%{
        transform:translateX(-100px) rotateZ(-10deg)  rotateY(5deg);
    }100%{
        transform:translateX(-100px) rotateZ(-2deg)  rotateY(-2deg);
    }
}

@keyframes floating2{
    0%{
        transform:translate(0) rotateZ(0deg);
    }20%{
        transform: translate(-10px) rotateZ(0deg);
    }
    50%{
        transform:translate(-20px) rotateZ(20deg);
    }
    75%{
        transform: translate(-10px) rotateZ(-10deg);
    }100%{
        transform: translate(0px) rotateZ(0deg);
    }
}
.rubbish{
    margin-top:-1680px;
}
</style>