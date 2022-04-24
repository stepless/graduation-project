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
                        海洋的塑料污染现象十分严重。科学家呼吁人类不要再污染海洋，威胁鱼类的生存与健康。例如，鲸鲨已经被列为世界自然保护联盟濒危物种红色名录（IUCN）上。鲸鲨虽然是海洋中体积最大的鲸鱼，但它靠吃浮游生物、甲壳类动物以及小鱼为生。此外，塑料污染还可能使鱼类无法吸收足够的营养，对其消化系统带来伤害等。吞食塑料微粒及垃圾还让这些海洋生物面临慢性中毒的危险。
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