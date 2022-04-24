<template>
  <div class="userL">
    <!-- <header class="search">
      <div class="item2">
        <button @click="this.addDialogVisible=true" type="button">添加用户</button>
      </div>
    </header> -->
    <div class="userShow">
      <div class="userT">
        <table cellspacing="0" cellpadding="0" class="userTable">
          <colgroup>
            <col name="tableColumn1" width="80" />
            <col name="tableColumn2" width="250" />
            <col name="tableColumn3" width="120" />
            <col name="tableColumn4" width="250" />
            <col name="tableColumn5" width="150" />
            <col name="tableColumn6" width="80" />
            <col name="tableColumn7" width="80" />
            <col name="tableColumn8" width="100" />
          </colgroup>
          <thead>
            <tr>
              <th class="tableColumn1">
                <div class="cell">序号</div>
              </th>
              <th class="tableColumn2">
                <div class="cell">文章题目</div>
              </th>
              <th class="tableColumn3">
                <div class="cell">作者</div>
              </th>
              <th class="tableColumn4">
                <div class="cell">文章简介</div>
              </th>
              <th class="tableColumn5">
                <div class="cell">创建时间</div>
              </th>
              <th class="tableColumn6">
                <div class="cell">浏览量</div>
              </th>
              <th class="tableColumn7">
                <div class="cell">评论量</div>
              </th>
              <th class="tableColumn8">
                <div class="cell">操作</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(article, index) in showArticle" :key="index">
              <td class="tableColumn1">
                <div class="cell">{{ (index+1) + this.pageN }}</div>
              </td>
              <td class="tableColumn2">
                <div class="cell" :title="article.title">{{ article.title }}</div>
              </td>
              <td class="tableColumn3">
                <div class="cell">{{ article.author }}</div>
              </td>
              <td class="tableColumn4" >
                <div class="cell">
                  {{ article.summary }}
                </div>
              </td>
              <td class="tableColumn5">
                <div class="cell">
                  {{ article.createDate }}
                </div>
              </td>
              <td class="tableColumn6">
                <div class="cell">
                  {{ article.viewCounts }}
                </div>
              </td>
              <td class="tableColumn6">
                <div class="cell">
                  {{ article.commentCounts }}
                </div>
              </td>
              <td class="tableColumn8">
                <div class="cell">
                  <button @click="openDelete(article)">
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                        <i class="iconfont icon-shanchu"></i>
                    </el-tooltip>
                  </button>
                  <button @click="this.openDetail(article.id)">
                    <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
                      <i class="iconfont icon-xiangqing-"></i>
                    </el-tooltip>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
      <div class="mt">
          <span>共 {{this.articles.length}} 条</span>
          <el-pagination
            v-model:currentPage="this.queryInfo.pagenum"
            :page-size="this.queryInfo.pagesize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="this.articles.length"
            @current-change="this.pageN = (this.queryInfo.pagenum - 1) * 8"
          />
        </div>
    </div>
  

    <!-- 文章详情 -->
    <div v-if="articleMassageVisible" class="back articleMessage">
      <div class="details">
        <div class="main">
        <div class="view-card">
          <h1 class="view-title">{{temporary.title}}</h1>
          <div class="view-author">
            <a>
              <img class="view-picture" :src="temporary.avatar" />
            </a>
            <div class="view-info">
              <span>{{temporary.author}}</span>
              <div class="view-meta">
                <span>{{temporary.createDate}}</span>
              </div>
            </div>
          </div>
          
          <div class="view-content">
            <p v-for="(data,index) in this.contents" :key="index">
              {{contents[index]}}
            </p>
          </div>
          
          <ul class="tag-list">
            <li class="tag-item" v-for="t in temporary.tags" :key="t.id">
              <button type="button">{{t.tagName}}</button>
            </li>
          </ul>
          <div class="view-end">
          </div>
          <div class="viewComment">
              <span>浏览   {{temporary.viewCounts}}</span>
              <span>评论   {{temporary.commentCounts}}</span>
          </div>

            <CommentItem
              v-for="(c,index) in comments"
              :comment="c"
              :articleId="temporary.id"
              :index="index"
              :rootCommentCounts="comments.length"
              @commentCountsIncrement="commentCountsIncrement"
              :key="c.id" />

          <!-- </div> -->
        </div>
      </div>
        <button @click="this.articleMassageVisible = false" class="shut" type="button">
          关闭
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import CommentItem from '@/components/article/commentItem'
import {getArticles,viewArticle,deleteArticle} from '@/api/article'
import {getCommentsByArticle} from '@/api/comment'
import "@/assets/css/userList.css";

export default {
  data() {
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:8,
      },
      searchData: "",

      articles: [],
      
      showArticle:[],

      innerPage: {
          page : 1,
          pageSize : 2,
          tagId : null,
      },

      pageN:0,
      selectI:0,

      temporary: {
          id: '',
          title: '',
          avatar:'',
          body:'',
          commentCounts: 0,
          viewCounts: 0,
          summary: '',
          author: '',
          tags: [],
          createDate: '',
      },
      
      articleMassageVisible:false,

      contents:[],
      comments: [],
      comment: {
        article: {},
        content: ''
      }
    };
  },
  watch: {
    pageN(newQuestion, oldQuestion) {
      this.limitPage(newQuestion);
    }
  },

  mounted(){
    this.getArticles();
  },
  components: {
      CommentItem,
  },
  methods: {
    // 发起请求
    getArticles(){
        getArticles(this.innerPage).then((res) => {
            if(res.data.success){
                this.articles = this.articles.concat(res.data.data.data);
                this.limitPage(this.pageN);
            }else{
                this.$message.error(res.data.msg);
            }
        }).catch((err)=>{
            this.$message.error("文章加载失败");
        }).finally(()=>{
        })
    },
    getArticle(articleId) {
      let that = this
      that.getCommentsByArticle(articleId);
      viewArticle(articleId).then((res)=>{
        if(res.data.success){
            Object.assign(that.temporary, res.data.data);
            this.contents = res.data.data.body.content.split('\n');
        }else{
            this.$message.error(res.data.msg);
        }
      }).catch((err)=>{
          this.$message.error("系统错误");
      }).finally(()=>{
      });
    },
    getCommentsByArticle(articleId) {
      let that = this
      getCommentsByArticle(articleId).then((res) => {
        if(res.data.success){
              that.comments = res.data.data
        }else{
            that.$message({type: 'error', message: '评论加载失败', showClose: true})
        }
      }).catch(error => {
        if (error !== 'error') {
          that.$message({type: 'error', message: '评论加载失败', showClose: true})
        }
      })
    },
    deleteArticle(article){
      deleteArticle(article).then((res)=>{
        if(res.data.success){
            this.$message.success("操作成功");
              this.$router.go(0);
          }else{
              this.$message.error(res.data.msg);
          }
      }).catch((err)=>{
          this.$message.error("系统错误");
      }).finally(()=>{
      });
    },
    // 分页
    limitPage(n){
      this.showArticle = [];
      let size = n+8;
      if(this.articles.length < size){
        for(let i = n; i < this.articles.length; i++){
          this.showArticle.push(this.articles[i]);
        }
      }else{
        for(let i = n; i < size; i++){
          this.showArticle.push(this.articles[i]);
        }
      }
    },

    // 打开用户信息
    openDetail(articleId){
      this.getArticle(articleId);
      this.articleMassageVisible = true;
    },

    // 确认框
    openDelete(article){
      this.$confirm('是否删除该文章？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {

          this.deleteUser(user);
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
};
</script>

<style scoped>
.el-form >>> .el-form-item textarea{
  resize: none;
}
.userL .search{
  width: 1110px;
}
.userL .mt{
  width: 1110px;
}
.articleMessage .details{
  width: 1100px;
  margin-left: auto;
  margin-right: auto;
  height: 640px;
  background-color: white;
  border-radius: 8px;
  overflow-y: auto;
  padding-left: 200px;
}
.articleMessage .details::-webkit-scrollbar{display:none}
.articleMessage .details .shut{
  margin:20px 278px;
}
.main {
    width: 730px;
    overflow: hidden;
  }

  .view-title {
    font-size: 26px;
    font-weight: 800;
    line-height: 1.3;
  }

  .view-author {
    /*margin: 30px 0;*/
    margin-top: 30px;
    margin-bottom: 30px;
    vertical-align: middle;
  }

  .view-picture {
    width: 40px;
    height: 40px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
    background-color: #5fb878;
  }

  .view-info {
    display: inline-block;
    vertical-align: middle;
    margin-left: 8px;
  }

  .view-meta {
    margin-top:6px;
    font-size: 12px;
    color: #969696;
  }

  .view-end {
    border-bottom: 1px solid #eee;
    margin:20px 0;
  }

  p{
    margin: 0 0 20px 0;
    line-height: 1.8;
    font-size: 14px;
    color: #111;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .tag-list .tag-item{
      display: inline-block;
      white-space: nowrap;
      margin-right: 10px;
      padding: 3px 13px;
      background-color: #f5f5f5;
      font-size: 13px;
      letter-spacing: normal;
      word-spacing: normal;
      vertical-align: top;
      margin-top:25px;
    }
    .tag-item button{
        color: #37a;
        height: 30px;
    }
    .main .viewComment {
      text-align: right;
      font-size: 13px;
      margin-bottom: 30px;
      color:#37a;
    }
    .main .viewComment span{
      margin-left: 20px;
    }
    .headImg-write{
      display:flex;
      justify-content: space-between;
      align-items: center;
    }
  .view-comment-title {
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
  }

  .view-comment-write {
    margin-top: 20px;
  }

  .view-comment-text {
    font-size: 16px;
    width:670px;
  }
  .articleMessage .details >>> .vi-comment-item .vi-comment-tools{
    opacity: 0;
  }
  .issue{
    padding-top: 12px;
    text-align: right;
  }
  .v-show-content {
    padding: 8px 25px 15px 30px !important;
  }

  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background: #fff !important;
  }
</style>
