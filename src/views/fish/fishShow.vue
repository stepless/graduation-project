<template>
    <div class="page">
        <Header />
        <div class="contain">
            <div class="main">
                <div class="avatar">
                    <img :src="fish.avatar" />
                </div>
                <div class="message">
                    <div class="item">
                        <h2>名称</h2>
                        <div class="text">
                            {{ fish.fishName }}
                        </div>
                    </div>
                    <div class="item">
                        <h2>介绍</h2>
                        <div class="text">
                            {{ fish.introduce }}
                        </div>
                    </div>
                    <div class="item">
                        <h2>分布地区</h2>
                        <div class="text">
                            {{ fish.region }}
                        </div>
                    </div>
                    <div class="item">
                        <h2>生物学分类</h2>
                        <div class="text">
                            {{ fish.classification }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/header.vue"
import Footer from "@/components/footer.vue"
import { findFishById } from "@/api/fish.js"
export default {
    components:{Header,Footer},
    data(){
        return {
            fish: {
                id:1,
                fishName: "濒危鱼类信息波纹唇鱼飞机阿斯顿",
                avatar: "",
                introduce: "",
                region: "",
                classification: "",
                sketch: "/static/img/波纹唇鱼G.png",
            },
        }
    },
    mounted(){
        this.getFish();
    },
    methods:{
        getFish() {
            let that = this
            findFishById(that.$route.params.id).then((res)=>{
                if(res.data.success){
                    Object.assign(that.fish, res.data.data);
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
            });
        },
    }
}
</script>

<style scoped>
header.nav >>> nav.item2 ul li:nth-of-type(3) a{
  color:#d15431;
}
.contain{
    padding-top:120px;
    position: relative;
}
.contain .main{
    width:980px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 240px;
    position: relative;
    padding-top: 30px;
}
.contain .main .avatar{
    width:200px;
    height: 200px;
    display: flex;
    align-items: center;
    position:absolute;
    left:0px;
    top:0px;
}
.contain .main .message .item{
    margin-bottom:30px;
}

.contain .main .message .item h2{
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 10px;
}
.contain .main .message .item .text{
    line-height: 1.5;
    padding:10px;

}
</style>