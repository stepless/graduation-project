<template>
  <div class="page">
    <Header />
    <img class="backImg-player" src="@/assets/img/R.jpg" />
    <div id="register">
      <div class="login-box login-box-radius">
        <h1>Register</h1>

        <el-form ref="userForm" :model="userForm" :rules="rules">
          <el-form-item class="fromItem" prop="account">
            <el-input class="fromInput" placeholder="用户名" v-model="userForm.account"></el-input>
          </el-form-item>

          <el-form-item class="fromItem" prop="nickname">
            <el-input class="fromInput" placeholder="昵称" v-model="userForm.nickname"></el-input>
          </el-form-item>

          <el-form-item class="fromItem" prop="password">
            <el-input class="fromInput" placeholder="密码" type="password" v-model="userForm.password" show-password></el-input>
              <p class="goRegister"><a href="/login">已有账号<i class="iconfont icon-jiantou_xiangyouliangci"></i></a></p>
          </el-form-item>

          <el-form-item size="small" class="login-button">
            <el-button class="fromButton" type="primary" @click="toRegister('userForm')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import {register} from '@/api/login'
import Header from "../components/header.vue"
import Footer from "../components/footer.vue"
import imgSize from "@/mixins/imgSize.js"
export default {
  name: 'Register',
  components:{Header,Footer},
  data() {
    return {
      userForm: {
        account: '',
        nickname: '',
        password: ''
      },
      rules: {
        account: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {max: 10, message: '不能大于10个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min:8, max: 16, message: '8~16位字符', trigger: 'blur'}
        ]
      },
    }
  },
  mixins:[imgSize],
  methods: {
    toRegister(formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.register();
        } else {
          return false;
        }
      });
    },
    register(){
      register(this.userForm).then((res)=>{
        if(res.data.success){
          this.$message({
              type: 'success',
              showClose: false,
              duration: 3000,
              center: true,
              dangerouslyUseHtmlString: true,
              message: '注册成功！',
          })
        }else{
          this.$message.error(res.data.msg);
        }
      }).catch((err)=>{
          this.$message.error("系统错误");
      }).finally(()=>{
			});
    },
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
.page{
  min-height: 750px;
  position:relative;
}
#login {
  min-width: 100%;
  min-height: 100%;
}

.backImg-player {
  background-color: transparent;
  width: 100vw;
  height: 100vh;
  object-fit: fill;
  display: block;
  position: absolute;
  left: 0;
  z-index: 0;
  top: 0;
}
.login-box {
  position: absolute;
  width: 400px;
  height: 500px;
  background-color: rgba(0,0,0,.3);
  margin-top: 150px;
  margin-left: -180px;
  left: 50%;
  padding:50px;
  padding-top: 80px;
}

.login-box-radius {
  border-radius: 10px;
  box-shadow: 0px 0px 1px 1px rgba(161, 159, 159, 0.1);
}

.login-box h1 {
  text-align: center;
  font-size: 32px;
  margin-bottom: 40px;
  vertical-align: middle;
  color:rgb(214, 214, 214);
  font-weight:600;
}
.fromItem{
  margin-bottom:30px;
  position:relative;
}
.fromInput >>> .el-input__inner{
  background-color:initial;
  height:38px;
  color:rgb(223, 223, 223);
}
.goRegister{
  position:absolute;
  right:0px;
  bottom:-30px;
  color:rgb(194, 194, 194);
}
.goRegister a:hover{
  color:rgb(86, 122, 120);
}

.login-design {
  text-align: center;
  font-family: arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
  font-size:24px;
}

.login-button {
  text-align: center;
  padding-top:20px;
}
.fromButton{
  background: #74ebd5;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ACB6E5, #74ebd5);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ACB6E5, #74ebd5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border:none;
  width:300px;
  height:38px;
  border-radius: 10px;
  font-size:16px;
}
.footerCon{
  height: 100vh;
  width:100%;
  position:relative;
}
</style>
