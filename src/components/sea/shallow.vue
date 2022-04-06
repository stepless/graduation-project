<template>
    <div class="part2">
        <div class="wave">
            <img class="water" src="../../assets/img/波浪.png">
            <img class="water" src="../../assets/img/波浪.png">
        </div>
        <div class="back">
            <div class="light">
                <div class="light1"></div>
                <div class="light2"></div>
                <div class="light2"></div>
                <div class="light1"></div>
                <div class="light1"></div>
                <div class="light2"></div>
                <div class="light1"></div>
            </div>
            <div class="stone">
                <img class="rock1" src="../../assets/img/石头.png">
                <img class="rock2" src="../../assets/img/石头水草.gif">
            </div>
            <div class="plastic-data">
                <div class="data-text">
                    <img src="../../assets/img/杀手.png" />
                    <p>
                        近年来，泄漏到水生生态系统中的塑料污染急剧增加，预计到2030年将增加一倍以上，对人类健康、全球经济、生物多样性和气候造成可怕的后果。
                    </p>
                    <a href="/hotspot">more details</a>
                </div>
                <div class="data-icon">
                    <div class="item1">
                        <img src="../../assets/img/水瓶.png" />
                    </div>
                    <div class="item2">
                        <p>海洋垃圾</p>
                        <p><span class="information">{{ this.proportion }}</span><span>%</span></p>
                        <p>为塑料</p>
                    </div>
                    <div class="item3">
                        <img src="../../assets/img/袋子.png" />
                    </div>
                </div>
            </div>
           <div class="he">

           </div>
        </div>
    </div>
</template>

<script>
import roll from "../../mixins/roll.js"
import "@/assets/css/shallow.css"
export default {
    data(){
        return {
            "proportion":85,

        }
    },
    mixins:[roll],
    
    mounted(){
        const plasticData = document.querySelector('.plastic-data');
        window.addEventListener("scroll",()=>{
            this.monitorScroll(plasticData,500,300)
        })
    },
}

</script>

<style scoped>

</style>