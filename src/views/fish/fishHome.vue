<template>
    <div class="page">
        <Header />
        <div class="contains">
            <div class="fish">
                <ul class="fishList">
                    <li class="item" v-for="(item, index) in fishs" :key="index">
                        <a @click="view(item.id)">
                            <img :src="item.sketch"/>
                            <div class="cover">
                                <p>
                                    {{ item.fishName }}
                                </p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
           <Footer />
        </div>
    </div>

</template>

<script>
import Header from "../../components/header.vue"
import Footer from "../../components/footer.vue"
import { findAllFish } from '@/api/fish.js'
export default {
    components:{Header,Footer},
    data(){
        return {
            fishs: [
              {
                id:1,
                fishName: "濒危鱼类信息波纹唇鱼飞机阿斯顿",
                avatar: "",
                introduce: "",
                region: "",
                classification: "",
                sketch: "",
              },
            ],
        }
    },
    methods:{
        findAllFish(){
          findAllFish().then((res)=>{
            if(res.data.success){
                this.fishs = res.data.data;
            }else{
                this.$message.error(res.data.msg);
            }
          }).catch((err)=>{
              this.$message.error("濒危鱼类信息加载失败");
          }).finally(()=>{
          })
        },

        view(id){
            this.$router.push({path: `/show/${id}`})
        },
    },
    mounted(){
        this.findAllFish();
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
header.nav >>> nav.item2 ul li:nth-of-type(3) a{
  color:#d15431;
}

.contains{
    padding-top:120px;
    background-color:#00152e;
    position: relative;
}
.fish{
    width: 980px;
    margin-left: auto;
    margin-right: auto;
}
.fish ul.fishList{
    display: flex;
    flex-wrap:wrap;
    margin-right: -100px;
    min-height: 750px;
    padding-bottom: 90px;
}
.fish ul.fishList .item{
    width:168px;
    height: 168px;
    /* background: #d15431; */
    display:flex;
    align-items: center;
    border-radius: 8px;
    margin-right: 100px;
    margin-bottom: 30px;
    position: relative;
    padding:4px;
    overflow: hidden;
}
.fish ul.fishList .item a{
    display: block;
}
.fish ul.fishList .item img{
    display: inline-block;
}
.fish ul.fishList .item:hover .cover{
    opacity: 1;
}
.fish ul.fishList .item .cover{
    opacity: 0;
    color:#fff;
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    padding:20px;
    position: absolute;
    border-radius: 8px;
    display: flex;
    top:0px;
    left:0px;
    background-color: rgba(0,0,0,.4);
    width: 168px;
    height: 168px;
    align-items: center;
    transition: background-color .3s;
}
.fish ul.fishList .item:hover .cover p{
    width: 100%;
    animation:.3s ease-in-out 1 forwards leftToR;
    text-align: center;
}
@keyframes leftToR{
    0%{
        transform:translate(-100%);
    }
    100%{
        transform:translate(0%);
    }
}
@keyframes leftToR{
    0%{
        transform:translate(-100%);
    }
    100%{
        transform:translate(0%);
    }
}

</style>