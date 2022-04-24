<template>
    <div class="seabed">
        <img class="seabed-img" src="../../assets/img/水底.gif" />
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
                <img src="../../assets/img/量.png" />
            </div>
        </div>
        <div class="catch-text">
            <img src="../../assets/img/捕捞.png" />
            <p>
                所谓过度捕捞，就是捕鱼的速度超过了它们生长的速度。今天已经有大约<strong>93%</strong>的鱼类种群已经遭到过度捕捞或充分捕捞。根据国际自然保护联盟(IUCN)的濒危物种红色名录，<strong>1,616</strong>种鱼类面临灭绝危险；另有<strong>989</strong>只濒临灭绝，<strong>627</strong>只处于极度濒危状态。虽然栖息地丧失和污染是这些物种减少的重要因素，但迄今为止最大的威胁是过度捕捞。
                <br>
                因为鱼越来越少，所以捕捞强度越来越大，不合规的捕捞行为也越来越多。国际渔业管理机构指出，全球<strong>1/5</strong>的渔获来自非法的、不报告的和不受管制的的捕捞活动。
            </p>
            <a href="/hotspot">more details</a>
        </div>
    </div>
    <div class="endangered">
        <div class="danger">
            <div class="danger-contains">
                <div class="backImg">
                    <h2>2007年-2018年濒危等级变化的物种</h2>
                    <img class="bin" src="@/assets/img/濒危.png">
                    <img src="@/assets/img/濒危变化.png">
                </div>
                <div class="danger-text item1">
                    根据2007年-2018年世界自然保护联盟发布的《世界自然保护联盟濒危物种红色名录》，这12年间更多的濒危物种濒危等级不断上升，未来的命运扑朔迷离。
                </div>
                <div class="danger-text item2">
                    2007年-2018年间共138个濒危物种濒危等级降低，即该物种存活情况变好。而濒危等级上升的物种高达589个，是情况变好物种数量的4.26倍。12年中，每年濒危等级上升的物种数量始终比濒危等级下降的物种数量多，形势不容乐观。其中在2012年，濒危等级上升的物种数量是濒危等级下降的物种数量的20倍。
                </div>
                <div class="danger-text item3">
                    根据国际自然保护联盟(IUCN)的濒危物种红色名录，1,616种鱼类面临灭绝危险；另有989只濒临灭绝，627只处于极度濒危状态。虽然栖息地丧失和污染是这些物种减少的重要因素，但迄今为止最大的威胁是过度捕捞。
                </div>
                <div style="height:300px"></div>
            </div>
            <div class="danger-article">
                    <h2>·&nbsp;还要失去多少物种，我们才能行动&nbsp;·</h2>
                    <p>
                        12年间，有8个物种永远地消失在这个世界上。其中，珊瑚裸尾鼠的濒危状态在2016年被《世界自然保护联盟濒危物种红色名录》标记为“灭绝”。这是首种因“人类活动导致的气候变化”而消失的哺乳动物——2016年，昆士兰州政府与昆士兰大学发布了一项关于珊瑚裸尾鼠的调查报告，认为气候变化造成海平面上升和极端天气事件频发，布兰布尔礁多次被海水淹没，使珊瑚裸尾鼠的栖息地遭到严重破坏。
                    </p>
                    <p>
                        我们赖以生存的环境，是一个紧密联系、动态循环的生命网络，每一个物种，都是这个周密运转的网络中不可或缺的链条，动物在食物链和生命链中相互依存的关系，在人类的进化和发展中，发挥了不可或缺的作用，千百年来形成并维持着某种动态的平衡。这种循环往复的生命链条一旦被打破，人类的生存环境也必然遭受重创。
                    </p>
                </div>
        </div>
    </div>
</template>

<script>
import "@/assets/css/seabed.css"
import roll from "../../mixins/roll.js"

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