<template>
    <div class="page">
        <Header />
        <div class="main">
            <div class="container">
                <div class="form-box" method="post" action="#">
                    <!-- 注册 -->
                    <form class="register-box hidden">
                        <h1>register</h1>
                        <div class="item">
                            <input v-empty="this.regular.username" v-model="registerFrom.setUsername" type="text" placeholder="用户名">
                            <p class="error1">请输入用户名</p>
                            <p class="error2">用户名至少2个汉字或3个字母</p>
                        </div>
                        <div class="item">
                            <input v-empty="this.regular.email" v-model="registerFrom.email" type="email" placeholder="邮箱">
                            <p class="error1">请输入邮箱</p>
                            <p class="error2">请填写正确的邮箱</p>
                        </div>
                        <div class="item">
                            <input v-empty="this.regular.password" v-model="registerFrom.setPassword" type="password" placeholder="密码（8~16，含数字、字母）">
                            <div v-eye class="xsyc iconfont icon-xianshi" v-if="this.setPassword !== ''"></div>
                            <p class="error1">请输入密码</p>
                            <p class="error2">密码必须含有数字和字母，8~16位</p>
                        </div>
                        <div class="item">
                            <input v-empty="this.regular.password" v-model="registerFrom.rePassword" type="password"  placeholder="确认密码">
                            <div v-eye class="xsyc iconfont icon-xianshi" v-if="this.rePassword !== ''"></div>
                            <p class="error1">请再次确认密码</p>
                            <p class="error2">密码必须含有数字和字母，8~16位</p>
                            <p class="error3">两次密码不一致</p>
                        </div>
                        <div class="move">
                            <a id="login" href="javascript:;">已有账号，直接登录>></a>
                        </div>
                        <button type="button">注册</button>
                    </form>
                    <!-- 登录 -->
                    <form class="login-box">
                        <h1>login</h1>
                        <div class="item">
                            <input v-empty v-model="loginFrom.username" type="text" placeholder="用户名/邮箱">
                            <p class="error1">请输入用户名/邮箱</p>
                        </div>
                        <div class="item">
                            <input v-empty v-model="loginFrom.password" type="password" placeholder="密码">
                            <div v-eye class="xsyc iconfont icon-xianshi" v-if="this.password !== ''"></div>
                            <p class="error1">请输入密码</p>
                        </div>
                        <div class="move">
                            <a id="register" href="javascript:;">没有账号，去注册>></a>
                        </div>
                        <button type="button">登录</button>
                    </form>
                </div>
                <div class="con-box left">
                    <img class="jy1" src="../assets/img/鲸鱼.png">
                    <img class="coml" src="../assets/img/coml.png">
                </div>
                <div class="con-box right">
                    <img class="bhhy" src="../assets/img/bhhy.png">
                    <img class="jy2" src="../assets/img/鲸鱼2.png">
                </div>
            </div>
        </div>
        <!-- <div class="footer">
            © 2022 濒危海洋鱼类保护网站
        </div> -->
    </div>
</template>

<script>
import Header from "../components/header.vue";
import "@/assets/css/login.css"
export default {
    components:{Header},
    data(){
        return {
            registerFrom:{
                "setUsername":'',
                "setPassword":'',
                "rePassword":'',
                "email":'',
            },
            loginFrom:{
                "username":'',
                "password":'',
            },
            "regular":{
                "username":/^([\u4e00-\u9fa5]{2,4})|([A-Za-z0-9_]{4,16})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/,
                "password":/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                "email":/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            },
        }   
    },
    directives:{
        "empty":function(el,binding){
            el.addEventListener('blur',function(){
                let pattern = binding.value || null;
                let f;
                if(pattern === null){
                    f = true;
                }else{
                    f = pattern.test(this.value);
                }
                const error1 = this.parentNode.querySelector('.error1');
                const error2 = this.parentNode.querySelector('.error2');
                const error3 = this.parentNode.querySelector('.error3');
                if(this.value.length === 0){
                    this.classList.add('borderBottom');
                    error1.classList.add('block');
                    if(error2){
                        error2.classList.remove('block');
                    }
                } else {
                    error1.classList.remove('block');
                    if(f){
                        if(error2){
                            error2.classList.remove('block')
                        }
                        this.classList.remove('borderBottom')
                    }else {
                        error2.classList.add('block');
                    }
                }
            })
        },
        "eye":function(el){
            let flag = 0;
            el.addEventListener('click',function(){
                let pass = el.parentNode.querySelector('input');
                if(flag === 0){
                    this.className = 'xsyc iconfont icon-xianshiyincangxiang';
                    pass.type = 'text';
                    flag = 1;
                }else if(flag === 1) {
                    this.className = 'xsyc iconfont icon-xianshi';
                    pass.type = 'password';
                    flag = 0;
                }
            })
        },

    },
    methods:{

    },
    mounted(){
        let logIn = document.querySelector("#login")
        let register = document.querySelector("#register")
        let form_box = document.querySelector('.form-box')
        let register_box = document.querySelector('.register-box')
        let login_box = document.querySelector('.login-box')

        register.addEventListener('click',()=>{
            form_box.style.transform = 'translate(93%)';
            login_box.classList.add('hidden')
            register_box.classList.remove('hidden')
        })
        logIn.addEventListener('click',()=>{
            form_box.style.transform = 'translate(0%)';
            login_box.classList.remove('hidden')
            register_box.classList.add('hidden')
        })
    }
}
</script>
<style scoped>
header.nav{
    background-color:rgba(0,0,0,0);
    box-shadow: none;
}

</style>