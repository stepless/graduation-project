<template>
    <div class="view-container">
      <div class="main">
        <div class="view-card">
          <h1 class="view-title">{{article.title}}</h1>
          <div class="view-author">
            <a>
              <img class="view-picture" :src="avatar" />
            </a>
            <div class="view-info">
              <span>{{article.author}}</span>
              <div class="view-meta">
                <span>{{article.createDate}}</span>
              </div>
            </div>
          </div>
          
          <div class="view-content">
            <p v-for="(data,index) in this.contents" :key="index">
              {{contents[index]}}
            </p>
          </div>
          
          <ul class="v-tag-list">
            <li class="v-tag-item" v-for="t in article.tags" :key="t.id">
              <button @click="tag(t.id)" type="button">{{t.tagName}}</button>
            </li>
          </ul>
          <div class="view-end">
          </div>
          <div class="viewComment">
              <span>浏览   {{article.viewCounts}}</span>
              <span>评论   {{article.commentCounts}}</span>
          </div>

          <div class="view-comment">
            <div class="view-comment-write">
              <div class="headImg-write">
                <div class="headImg3">
                  <img class="view-picture" :src="commentAvatar" />
                </div>
                <div class="write">
                  <el-input
                      type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="你的评论..."
                      class="view-comment-text"
                      v-model="comment.content"
                      resize="none">
                    </el-input>
                </div>
              </div>
              <div class="issue">
                <el-button type="button" @click="publishComment()">评论</el-button>
              </div>
            </div>

            <CommentItem
              v-for="(c,index) in comments"
              :comment="c"
              :articleId="article.id"
              :index="index"
              :rootCommentCounts="comments.length"
              @commentCountsIncrement="commentCountsIncrement"
              :key="c.id" />

          </div>

        </div>
      </div>

    </div>
</template>

<script>
import CommentItem from '@/components/article/commentItem'
import {viewArticle} from '@/api/article'
import {getCommentsByArticle, publishComment} from '@/api/comment'

import default_avatar from '@/assets/img/dog.jpg'

export default {
  created() {
    this.getArticle();
    this.getCommentsByArticle();
  },
  data() {
    return {
      article: {
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
      contents:[],
      comments: [],
      comment: {
        article: {},
        content: ''
      }
    }
  },
  computed: {
    avatar() {
      let avatar = this.article.avatar;
      if (avatar.length > 0) {
        return avatar
      }
      return default_avatar
    },
    commentAvatar(){
      let commentAvatar = localStorage.getItem('avatar');
      if(commentAvatar){
        return commentAvatar;
      }
      return default_avatar;
    }
  },
  methods: {
    tag(id) {
      this.$router.push({path: `/hotspot/tag/${id}`})
    },
    getArticle() {
      let that = this
      viewArticle(that.$route.params.id).then((res)=>{
        if(res.data.success){
            Object.assign(that.article, res.data.data);
            this.contents = res.data.data.body.content.split('\n');
        }else{
            this.$message.error(res.data.msg);
        }
      }).catch((err)=>{
          this.$message.error("系统错误");
      }).finally(()=>{
      });
    },
    publishComment() {
      let that = this;
      let account = localStorage.getItem('account');
      let id = localStorage.getItem('id');
      if(account != null && id != null){
        if (!that.comment.content) {
          return;
        }
        that.comment.article.id = that.article.id
        let parms = {articleId:that.article.id,content:that.comment.content,toUserId:id}
        publishComment(parms).then((res) => {
          if(res.data.success){
            that.$message.success('评论成功');
            that.comment.content = ''
            that.comments.unshift(res.data.data);
            that.commentCountsIncrement();
            that.$router.go(0);
          }else{
                that.$message({type: 'error', message: res.data.msg, showClose: true})
          }

        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '评论失败', showClose: true})
          }
        })
      }else{
        that.$message.error('用户未登录');
      }
    },

    getCommentsByArticle() {
      let that = this
      getCommentsByArticle(that.$route.params.id).then((res) => {
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
    commentCountsIncrement() {
      this.article.commentCounts += 1
    }
  },
  components: {
    CommentItem,
  },
  // //组件内的守卫 调整body的背景色
  // beforeRouteEnter(to, from, next) {
  //   window.document.body.style.backgroundColor = '#fff';
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   window.document.body.style.backgroundColor = '#f5f5f5';
  //   next();
  // }
}
</script>

<style>
  .view-container {
    padding-top:120px;
    display: flex;
    justify-content: center;
  }

  .main {
    width: 730px;
    overflow: hidden;
  }
  .view-card{
    padding-bottom:60px;
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
  .v-tag-list .v-tag-item{
      display: inline-block;
      white-space: nowrap;
      margin-right: 10px;
      padding: 3px 13px;
      line-height: 1.62;
      background-color: #f5f5f5;
      font-size: 13px;
      letter-spacing: normal;
      word-spacing: normal;
      vertical-align: top;
      margin-top:25px;
    }
    .v-tag-item button{
        color: #37a;
        cursor: pointer;
    }

    .v-tag-list .v-tag-item:hover {
        background-color: #e8e8e8;
    }
    .view-container .main .viewComment {
      text-align: right;
      font-size: 13px;
      margin-bottom: 30px;
      color:#37a;
    }
    .view-container .main .viewComment span{
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
