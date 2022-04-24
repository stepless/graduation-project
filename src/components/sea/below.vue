<template>
    <div class="below">
        <div class="contains">
            <img src="../../assets/img/页尾.gif" />
            <div class="content">
                <ul>
                    <li v-for="(link,index) in this.links" :key="index">
                        <a :href="link">{{ index }}</a>
                    </li>
                </ul>
                <div class="about relation">
                    <div class="text">
                        <p>保护珍稀动物，维护我们共同的生命圈</p>
                    </div>
                    <div class="myself">
                        <div class="author-tool">
                            <i @click="showTool(qq)" :title="qq.title" class="iconfont icon-qq"></i>
                            <i @click="showTool(zhihu)" :title="zhihu.title" class="iconfont icon-zhihu-circle-fill"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import "@/assets/css/header.css"
import Footer from "../footer.vue"
export default {
    data(){
        return {
            links : {
                "首页" : "/",
                "新闻热点" : "/hotspot",
                "濒危海洋鱼类" : "/fish",
                "法律条例" : "/law",
                "关于我们" : "/about",
            },
            qq: {title: 'QQ', message: '2411131038'},
            zhihu: {
                title: '知乎',
                message: '<a target="_blank" href="https://www.zhihu.com/people/ming-jue-li-44">https://www.zhihu.com/people/ming-jue-li-44</a>'
            }
        }
    },
    methods: {
      showTool(tool) {
        this.$message({
          duration: 0,
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: '<strong>' + tool.message + '</strong>'
        });
      }
    },
    components:{Footer,}
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
    bottom:90px;
    align-items: flex-end;
}
.below .contains .content ul{
    display: flex;
    margin-left: 130px;
}
.below .contains .content ul li{
    margin-right: 30px;
}
.below .contains .content a{
    color:rgb(190, 190, 190);
}
.below .contains .content a:hover{
    color:rgb(232, 102, 55);
}

.about{
    margin-right: 130px;
    color:rgb(190, 190, 190);
}
.about .text>p{
    margin-bottom: 30px;
}
.icon-job {
    padding-left: 16px;
}

.author-tool {
    text-align: center;
    padding-top: 10px;
}

.author-tool i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 36px;
    color:rgb(190, 190, 190);
}
.author-tool i:nth-of-type(2){
    font-size: 38px;
}
</style>