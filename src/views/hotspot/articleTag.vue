<template>
	 <div class="ct-body">
	    <div class="ct-container">
	      <div class="ct-main">
	        <div class="ct-title area">
	          <div>
	            <img class="ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar"/>
	            <h3 class="ct-name">{{ct.tagName}}</h3>
	          </div>
	
	          <span class="ct-meta">{{ct.articles}} 文章</span>
	        </div>
	
	        <div class="ct-articles">
	          <ArticleScrollPage v-bind:query="article" />
	        </div>
	
	      </div>
	    </div>
	  </div>
</template>

<script>
	import defaultAvatar from '@/assets/img/logo.png'
    import ArticleScrollPage from "@/components/article/articleScrollPage.vue"
	import {getTagDetail} from "@/api/tag"
	export default {
        components:{ArticleScrollPage,},
		data(){
			return {
				defaultAvatar: defaultAvatar,
				ct : {},
				article : {
					tagId:null,
				}
			}
		},
		created(){
			//进行后端请求 请求数据
			this.getTagAndArticles();
		},
		methods:{
			getTagAndArticles(){
				var id = this.$route.params.id;
				this.getTagDetail(id);
				this.article.tagId = id;
			},
			getTagDetail(id){
				//发起http请求 请求后端的数据
				getTagDetail(id).then((res)=>{
					////res.data = Result (success,msg,data)
					if(res.data.success){
						this.ct = res.data.data;
					}else{
						this.$message.error(res.data.msg);
					}
				}).catch((err)=>{
					this.$message.error("系统错误");
				}).finally(()=>{
				})
			},
		},
	}
</script>

<style>
img.ct-picture{
	padding:4px;
	box-shadow:0px 0px 2px rgba(0, 0, 0, .3)
}
  .ct-body {
    padding-top:120px;
    min-width: 100%;
  }

  .el-main {
    padding: 0;
  }

  .ct-title {
    text-align: center;
    height: 180px;
    padding: 20px;
  }

  .ct-picture {
    width: 60px;
    height: 60px;
	margin-bottom: 12px;
  }

  .ct-name {
	font: 28px Helvetica,Arial,sans-serif;
	margin-bottom: 12px;
  }

  .ct-meta {
    font-size: 12px;
    color: #969696;
  }

  .ct-articles {
    width: 740px;
    margin: 30px auto;
  }

</style>
