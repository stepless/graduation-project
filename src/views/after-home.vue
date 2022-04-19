<template>
  <div class="page">
      <div class="menu clearfix">
        <div class="logo">
          <a href="/"><img src="@/assets/img/logo.png" /></a>
        </div>
        <div class="user relative">
            <div class="head-portrait">
                <img :src="avatar" />
            </div>
            <div class="personage">
                <div class="arrows"></div>
                <div class="arr"></div>
                <a href="/information">个人中心</a>
                <a href="/">回到首页</a>
                <a @click="quit" href="javascript:;">退出</a>
            </div>
        </div>
      </div>
      <div class="contains clearfix">
          <div class="side">
              <el-row class="tac">
                <el-col :span="24">
                <el-menu
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical-demo"
                    default-active="1"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <router-link to="/afterHome">
                      <el-menu-item index="1">
                          <el-icon><icon-menu /></el-icon>
                          <span>后台管理</span>
                      </el-menu-item>
                    </router-link>

                    <router-link to="/user">
                      <el-menu-item index="2">
                        <el-icon><icon-menu /></el-icon>
                        <span>用户管理</span>
                      </el-menu-item>
                    </router-link>
                    
                    <el-sub-menu index="3">
                      <template #title>
                          <el-icon><document /></el-icon>
                          <span>文章管理</span>
                      </template>
                      <el-menu-item-group>

                          <router-link to="/articleManage">
                            <el-menu-item index="2-1"><span>文章内容管理</span></el-menu-item>
                          </router-link>

                          <router-link to="/write">
                            <el-menu-item index="2-2"><span>添加文章</span></el-menu-item>
                          </router-link>
                      </el-menu-item-group>
                    </el-sub-menu>

                    <router-link to="/articleManage">
                      <el-menu-item index="4">
                        <el-icon><icon-menu /></el-icon>
                        <span>濒危鱼类管理</span>
                      </el-menu-item>
                    </router-link>
                </el-menu>
                </el-col>
            </el-row>
          </div>
          <div class="main">
            <router-view></router-view>
          </div>
      </div>
  </div>
</template>

<script>
import '@/assets/css/after-home.css'
import default_avatar from '@/assets/img/dog.jpg';
export default{
  data(){
  },
  computed:{
    avatar(){
      let avatar = localStorage.getItem('avatar');
      if(avatar != null && avatar.length > 0){
        return avatar;
      }
      return default_avatar;
    }
  },
  methods:{
    quit(){
      localStorage.clear();
      this.$message.success('退出成功');
      this.ifLogin();
      this.$router.push('/login');
    }
  }

}
</script>


<style scoped>
  .tac{
    height: 100%;
  }
  .tac >>> .el-menu{
    height: 100%;
  }
  
  .main{
    width:100%;
    padding-top:100px;
    padding-left:280px;
    padding-right: 20px;
    min-height: 750px;
    height: 100vh;
    position:absolute;
  }
  .el-menu-item-group .el-menu-item{
    font-size: 13px;
    text-align: center;
  }
  .el-menu-item-group .el-menu-item span{
    margin-left: 18px;
  }
  .el-menu-item-group >>>.el-menu-item-group__title{
    padding:0;
  }
  
</style>