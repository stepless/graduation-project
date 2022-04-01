<template>
    <div class="seabed">
        <img class="seabed-img" src="../assets/水底.gif" />
    </div>
    <div class="catch clearfix">
        <div class="catch-icon">
            <div class="icon-data">
                <div class="item1">
                    <h3>2017</h3>
                    <p>捕捞量<span>/万吨</span></p>
                    <p><strong>{{ amount[0] }}</strong></p>
                </div>
                <div class="item2">
                    <h3>2018</h3>
                    <p>捕捞量<span>/万吨</span></p>
                    <p><strong>{{ amount[1] }}</strong></p>
                </div>
                <div class="item3">
                    <h3>2019</h3>
                    <p>捕捞量<span>/万吨</span></p>
                    <p><strong>{{ amount[2] }}</strong></p>
                </div>
                <div class="item4">
                    <h3>2020</h3>
                    <p>捕捞量<span>/万吨</span></p>
                    <p><strong>{{ amount[3] }}</strong></p>
                </div>
            </div>
            <div class="icon-img">
                <img src="../assets/量.png" />
            </div>
        </div>
        <div class="catch-text">
            <img src="../assets/杀手.png" />
            <p>
                根据中国渔业统计年鉴数据显示，2015年以后中国海洋捕捞水产品产量呈现逐年下降趋势，到2020年中国海洋捕捞水产品产量已经下降至947.41万吨，是最近这十多年以来第一次下跌至1000万吨以下。主要原因是随着海洋捕捞压力的持续增加，渔业资源过度捕捞状况日益严重，海洋渔业资源受到环境与时间等条件的限制，再生能力受到制约，导致海洋渔业资源出现衰退现象, 海洋捕捞总产量不断减少。
            </p>
            <a href="/hotspot">more details</a>
        </div>
    </div>
    <div class="plastic">

    </div>
</template>

<script>
import "@/assets/css/seabed.css"
import roll from "../mixins/roll.js"

export default {
    data() {
        return {
            amount:[1112.42,1044.46,1000.15,947.41],
        };
    },
    mixins:[roll],
    mounted(){
        const catch1 = document.querySelector('.catch');
        window.addEventListener("scroll",()=>{
            this.monitorScroll(catch1,1300,1100)
        })
    },
}
</script>

<style scoped>
    
</style>