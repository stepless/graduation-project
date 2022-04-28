<template>
    <div class="page">
        <Header />
        <div class="contains">
            <div class="main">
              <div class="text">
                <p>
                  中国的国宝熊猫被大家所熟知，我国对熊猫的保护也是从不懈怠。而现实也不曾辜负这份努力，在2016年终于脱离了“濒危”行列，被划定为“易危”一级。
                </p>
                <p>
                  相比于国宝熊猫而言，其它的濒危动物就不是那么的幸运了，尤其是海洋鱼类。人们缺乏对海洋濒危鱼类的认识，甚至可以说是几乎没有了解，更不要说保护濒危海洋鱼类了。
                </p>
                <p>
                  本网站旨在让人们对濒危海洋鱼类有所了解，同时呼吁大家对濒危海洋鱼类进行关注。
                </p>
              </div>
              <div class="about">
                  <div>
                      联系方式：
                  </div>
                  <div class="item">
                     QQ： 1366083641
                  </div>
                  <div class="item">
                    邮箱：1366083641@qq.com
                  </div>
              </div>
            </div>
             <Footer />
        </div> 
    </div>

</template>

<script>
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
export default {
    components:{Header,Footer},
    data() {
      return {
      }  
    },

}
</script>


<style scoped>
header.nav >>> nav.item2 ul li:nth-of-type(5) a{
  color:#d15431;
}
header.nav{
    background-color:rgba(0,0,0,0);
    box-shadow: none;
}
header.nav >>> .item2 ul li a{
  color:white;
}
.contains{
    padding-top:200px;
    background-color:#00152e;
    position: relative;
    min-height: 730px;
    height: 100vh;  
}
.contains .main{
  width:1024px;
  margin-left: auto;
  margin-right: auto;
  color:white;
  line-height: 1.5;
  display:flex;
  align-content: center;
  height: 100%;
}
.contains .main .text{
  width: 500px;
  margin-right: 60px;
  text-indent: 2em;
}
.contains .main .text p{
  margin-bottom: 10px;
}
.contains .main .about{
  color: white;
}
.contains .main .about .item{
  padding-left:30px;
  padding-top:30px;
}
.icon-job {
    padding-left: 16px;
}

.about {
    padding-top: 10px;
}

.about i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 30px;
}
</style>