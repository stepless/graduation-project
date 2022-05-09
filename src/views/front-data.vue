<template>
    <div class="zuo">
        <div class="fish" @click="toShow">
            <img src="@/assets/img/long.png">
        </div>
    </div>
    <div class="fish-data">
        <div class="data-contains clearfix">
            <div class="data-left">
                <div class="goHome" @click="toHidden">
                    <span>
                        首 页
                    </span>
                </div>
                <div class="protect">
                    <span>保护&nbsp;<i class="iconfont icon-yuandian"></i>&nbsp;濒危海洋鱼类</span>
                </div>
            </div>
            <div class="data-right">
                <ul class="data-text">
                    <li class="item2">
                        <p>
                            <strong>
                                11
                            </strong>
                        </p>
                        <p>
                            网站收录
                        </p>
                    </li>
                    <li class="item1"></li>
                    <li class="item3">
                        <p>
                            <strong>
                                799
                            </strong>
                        </p>
                        <p>
                            易危
                        </p>
                    </li>
                    <li class="item2"></li>
                    <li class="item1"></li>
                    <li class="item3">
                        <p>
                            <strong>
                                249
                            </strong>
                        </p>
                        <p>
                            濒临灭绝
                        </p>
                    </li>
                    <li class="item2"></li>
                    <li class="item1">
                        <p>
                            <strong>
                                154
                            </strong>
                        </p>
                        <p>
                            极度濒危
                        </p>
                    </li>
                    <li class="item3">
                    </li>
                    <li class="item2">
                        <p>
                            <strong>
                                500
                            </strong>
                        </p>
                        <p>
                            深海硬骨鱼
                        </p>
                    </li>
                    <li class="item4">
                        <p>
                            <strong>
                                16
                            </strong>
                        </p>
                        <p>
                            鳐鱼
                        </p>
                    </li>
                    <li class="item1"></li>
                    <li class="item3 cur">
                        <div class="echarts">
                            <p>濒危海洋鱼类分布情况</p>
                            <div id="main" class="main_container"></div>
                        </div>
                        <p>
                            <strong>
                                濒危鱼类分布
                            </strong>
                        </p>
                    </li>
                    <li class="item2"></li>
                    <li class="item1"></li>
                    <li class="item3 cur">
                        <div class="echarts">
                            <p>濒危海洋鱼类数量变化</p>
                            <div id="main2" class="main_container"></div>
                        </div>
                        <p class="number">
                            <strong>
                                数量变化
                            </strong>
                        </p>
                    </li>
                    <li class="item4"></li>
                    <li class="item2"></li>
                    <li class="item1"></li>
                    <li class="item2"></li>
                    <li class="item4">
                        <p>
                            <strong>
                                81
                            </strong>
                        </p>
                        <p>
                            鲨鱼
                        </p>
                    </li>
                    <li class="item2"></li>
                    <li class="item1"></li>
                    <li class="item2 foot">
                        <span>数据均来自网络</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import "@/assets/css/data.css";

export default {
    data(){
        return {
            
        }
    },
    mounted() {
        this.initCharts();
        this.initCharts2();
    },
    methods: {
        initCharts() {
            // 初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById("main"))
            // 绘制图表
            myChart.setOption({
                tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                name: '种类数量',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 588, name: '太平洋' },
                    { value: 213, name: '地中海' },
                    { value: 394, name: '印度洋' },
                    { value: 510, name: '大西洋' },
                    { value: 46, name: '北冰洋' }
                ]
                }
            ]
            })
        },
        initCharts2() {
            // 初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById("main2"))
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c}种'
                },
                xAxis: {
                    type: 'category',
                    data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data: [968, 1002, 1031, 1073, 1105, 1123, 1202],
                    type: 'line',
                    smooth: true,
                    name:'种类数量'
                    }
                ]
            })
        },
        toShow(){
            let fishData = document.querySelector('.fish-data');
            fishData.style.transform = "translateX(" + (0) + "px)";
        },
        toHidden(){
            let fishData = document.querySelector('.fish-data');
            fishData.style.transform = "translateX(" + (100) + "%)";
        }
    }
}
</script>

<style scoped>

#main {
  height: 380px;
  width: 400px;
}
#main2 {
  height: 380px;
  width: 400px;
  padding-left: 30px;
}

</style>