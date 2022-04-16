<template>
  <div class="page">
      <div class="menu clearfix">
        <div class="logo">
          <img src="@/assets/img/logo.png" />
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
                    default-active="2"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                >
                    <el-sub-menu index="1">
                    <template #title>
                        <el-icon><document /></el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><span>用户信息管理</span></el-menu-item>
                        <el-menu-item index="1-2"><span>用户信息管理</span></el-menu-item>
                    </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                    <template #title>
                        <el-icon><document /></el-icon>
                        <span>文章管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1"><span>用户信息管理</span></el-menu-item>
                        <el-menu-item index="2-2"><span>用户信息管理</span></el-menu-item>
                    </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                    <template #title>
                        <el-icon><document /></el-icon>
                        <span>用户管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="3-1"><span>用户信息管理</span></el-menu-item>
                        <el-menu-item index="3-2"><span>用户信息管理</span></el-menu-item>
                    </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item index="4">
                    <el-icon><icon-menu /></el-icon>
                    <span>权限管理</span>
                    </el-menu-item>
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

<script lang="ts" setup>

</script>

<style scoped>
.menu{
  height: 80px;
  width:100%;
  position:absolute;
  background-color: rgb(67, 74, 80);
  z-index: 3;
}
.menu .logo{
  height: 80px;
  width:259px;
  float:left;
}
.menu .logo img{
  height: 80px;
}
.side{
  width:260px;
  padding-top:80px;
  height:100vh;
  min-height: 750px;
  position:absolute;
  z-index: 2;
}
.tac{
  height: 100%;
}
.tac >>> .el-menu{
  height: 100%;
}

.main{
  width:100%;
  padding-top:80px;
  padding-left:260px;
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