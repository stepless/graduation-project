<template>
    <div class="in-page">
        <Header />
        <div class="in-main">
            <div class="banner">
                <img src="@/assets/img/banner.jpg" />
            </div>
            <div class="introduce">
                <div class="headImg">
                    <img :src="avatar" />
                    <div class="figure">
                        <i class="iconfont icon-w_xiangpian"></i><br/>
                        修改我的头像
                    </div>
                    <div class="selectImg">
                        <ul class="headPortraits clearfix">
                            <li v-for="key in this.headPortrait" :key="key">
                                <img @click="cutImg(key.url)" :src="key.url" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="property">
                    <div class="user-name">
                        <h2 class="nickname">{{ user.nickname }}</h2>
                        <span>账号：{{ user.account }}</span>
                    </div>
                    <div class="item">
                        <h3 class="field-label">性别</h3>
                        <div class="field-content">
                            <div v-if="this.isShow[0]">
                                <span class="field-text">{{ user.sex }}</span>
                                <button @click="this.setIsShow(0)" type="button" class="field-modify">
                                    <i class="iconfont icon-bianji"></i>
                                    修改
                                </button>
                            </div>
                            <div v-if="!this.isShow[0]">
                                <input type="radio" name="sex" value="男" v-model="temporary.sex">
                                男
                                <input type="radio" name="sex" value="女" v-model="temporary.sex">
                                女
                                <div class="buttonGroup">
                                    <button @click="this.temporaryUser(0,true)" type="button" class="sava">保存</button>
                                    <button @click="this.temporaryUser(0,false)" type="button" class="cancel">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h3 class="field-label">个人简介</h3>
                        <div class="field-content">
                            <div v-if="this.isShow[1]">
                                <span class="field-text" v-html="brief"></span>
                                <button @click="this.setIsShow(1)" type="button" class="field-modify">
                                    <i class="iconfont icon-bianji"></i>
                                    <span v-if="user.brief.length > 0">修改</span>
                                    <span v-if="user.brief.length <= 0">填写</span>
                                </button>
                            </div>
                            <div v-if="!this.isShow[1]">
                                <textarea rows="3" class="textarea" v-model="temporary.brief" placeholder="介绍" />
                                <div class="buttonGroup">
                                    <button @click="this.temporaryUser(1,true)" type="button" class="sava">保存</button>
                                    <button @click="this.temporaryUser(1,false)" type="button" class="cancel">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h3 class="field-label">邮箱</h3>
                        <div class="field-content">
                            <div v-if="this.isShow[2]">
                                <span class="field-text">{{ user.email }}</span>
                                <button @click="this.setIsShow(2)" type="button" class="field-modify">
                                    <i class="iconfont icon-bianji"></i>
                                    <span v-if="user.email.length > 0">修改</span>
                                    <span v-if="user.email.length <= 0">填写</span>
                                </button>
                            </div>
                            <div v-if="!this.isShow[2]">
                                <input type="text" v-model="temporary.email" placeholder="邮箱" />

                                <div class="buttonGroup">
                                    <button @click="this.temporaryUser(2,true)" type="button" class="sava">保存</button>
                                    <button @click="this.temporaryUser(2,false)" type="button" class="cancel">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <h3 class="field-label">手机号</h3>
                        <div class="field-content">
                            <div v-if="this.isShow[3]">
                                <span class="field-text">{{ user.phone }}</span>
                                <button @click="this.setIsShow(3)" type="button" class="field-modify">
                                    <i class="iconfont icon-bianji"></i>
                                    <span v-if="user.phone.length > 0">修改</span>
                                    <span v-if="user.phone.length <= 0">填写</span>
                                </button>
                            </div>
                            <div v-if="!this.isShow[3]">
                                <input type="text" v-model="temporary.phone" placeholder="手机号" />

                                <div class="buttonGroup">
                                    <button @click="this.temporaryUser(3,true)" type="button" class="sava">保存</button>
                                    <button @click="this.temporaryUser(3,false)" type="button" class="cancel">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/header.vue";
import default_avatar from "@/assets/img/dog.jpg"
import '@/assets/css/information.css'
import {getUser,setUser} from '@/api/user.js'
export default {
    components:{Header,},
    data(){
        return {
            user:{
                account:'user',
                avatar:'',
                nickname:'一条马路',
                email:'2411131038@qq.com',
                phone:'15893817215',
                sex:'女',
                brief:'一条马路',
            },
            sysUser:{
                id:localStorage.getItem('id')
            },
            isShow:[true,true,true,true],
            temporary:{},
            headPortrait:[
                {url:'/static/user/user_1.jpg'},
                {url:'/static/user/user_2.jpg'},
                {url:'/static/user/user_3.jpg'},
                {url:'/static/user/user_4.jpg'},
                {url:'/static/user/user_5.jpg'},
                {url:'/static/user/user_6.jpg'},
                {url:'/static/user/dog.jpg'}
            ],
        }
    },
    mounted(){
        this.getUser();
    },
    computed:{
        avatar(){
            let avatar = this.user.avatar;
            if(avatar.length > 0){
                return avatar;
            }
            return default_avatar;
        },
        brief(){
            let brief = this.user.brief.replaceAll('\n','</br>');
            return brief
        }
    },
    methods:{
        getUser(){
            getUser(this.sysUser).then((res)=>{
				////res.data = Result (success,msg,data)
				if(res.data.success){
                    Object.assign(this.user,res.data.data);
                    Object.assign(this.temporary,res.data.data);
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
			})
        },
        setUser(){
            setUser(this.user).then((res)=>{
				////res.data = Result (success,msg,data)
				if(res.data.success){
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
			})
        },
        setIsShow(i){
            for(let j = 0; j < this.isShow.length; j++){
                if(j === i){
                    this.isShow[j] = false;
                }else{
                    this.isShow[j] = true;
                }
            }
        },
        temporaryUser(i,ifT){ 
            this.isShow[i] = true;
            if(ifT){
                Object.assign(this.user,this.temporary);
                this.setUser();
            }else{
                Object.assign(this.temporary,this.user);
            }
        },
        cutImg(url){
            this.user.avatar = url;
            Object.assign(this.temporary,this.user);
            this.setUser();
            localStorage.setItem('avatar',url);
            this.$router.go(0);
        },
    }
}
</script>

<style scoped>

</style>