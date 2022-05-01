<template>
	<div class="body" >
        <main class="container">
            <!-- <tab-pane label="标签" name="tag"> -->
            <div class="tagTitle">
              <h2>标签</h2>
            </div>
            
            <ul class="items">
                <li v-for="t in tags" @click="view(t.id)" :key="t.id" class="item">
                    <div class="content">
                        <a class="info">
                        <img class="img" :src="t.avatar?t.avatar:defaultAvatar"/>
                        <h4 class="name">{{t.tagName}}</h4>
                        </a>

                        <div class="meta">
                        <span>{{t.articles}}  文章</span>
                        </div>
                    </div>
                </li>
            </ul>
        </main>
	  </div>
</template>

<script>
	import defaultAvatar from '@/assets/img/logo.png'
	import { getAllTagsDetail } from "@/api/tag"
	export default {
		data(){
			return {
				tags: [],
				defaultAvatar : defaultAvatar
			}
		},
		created(){
			this.getAllTagsDetail();
		},
		methods:{
            view(id) {
                this.$router.push({path: `/hotspot/tag/${id}`})
            },
			//获取全部的标签列表
			getAllTagsDetail(){
				//发起http请求 请求后端的数据
				getAllTagsDetail().then((res)=>{
					////res.data = Result (success,msg,data)
					if(res.data.success){
						this.tags = res.data.data;
					}else{
						this.$message.error(res.data.msg);
					}
				}).catch((err)=>{
					this.$message.error("系统错误");
				}).finally(()=>{
				})
			}
		}
	}
</script>

<style>
  .body {
    padding-top:130px;
    display: flex;
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
  .tagTitle{
    padding:30px 0;
    border-bottom:1px solid #aaa;
    margin-left: 0.7em;
    margin-bottom: 30px;
  }
  .tagTitle h2{
    font-size: 24px;
    color: #666;
  }
  .container {
    width: 1000px;
  }

  .items {
    padding-top: 2rem;
  }

  .item {
    width: 25%;
    display: inline-block;
    margin-bottom: 2.4rem;
    padding: 0 .7rem;
    box-sizing: border-box;
  }

  .content {
    display: inline-block;
    width: 100%;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    transition: border-color .3s;
    text-align: center;
    padding: 1.5rem 0;
  }

  .info {
    cursor: pointer;
  }

  .img {
    margin: -40px 0 10px;
    width: 60px;
    height: 60px;
    vertical-align: middle;

  }

  .name {
    font-size: 21px;
    font-weight: 150;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 4px;
  }

  .description {
    min-height: 50px;
    font-size: 13px;
    line-height: 25px;
  }

  .meta {
    font-size: 12px;
    color: #969696;
  }
  .content .info .img{
    padding:4px;
    box-shadow: 0 0 2px rgba(0, 0, 0, .3);
    border-radius: 4px;
  }
</style>