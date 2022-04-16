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
                                    修改
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
                                    修改
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
                                    修改
                                </button>
                            </div>
                            <div v-if="!this.isShow[3]">
                                <input type="text" v-model="temporary.phone" placeholder="邮箱" />

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
            isShow:[true,true,true,true],
            temporary:{},
        }
    },
    mounted(){
        Object.assign(this.temporary,this.user);
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
            }else{
                Object.assign(this.temporary,this.user);
            }
        }
    }
}
</script>

<style scoped>

</style>