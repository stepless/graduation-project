<template>
  <div class="vi-comment-item">
    <div class="contains">
      <div class="avatarImg">
        <img class="view-picture" :src="comment.author.avatar" />
      </div>
      <div class="vi-content">
        <div class="viewInfo">
          <span class="vi-nickname">{{comment.author.nickname}}</span>
          <div class="vi-meta">
            <span>{{rootCommentCounts - index}}楼</span>
            <span>{{comment.createDate}}</span>
          </div>
        </div>
        <p class="vi-comment-content">{{comment.content}}</p>
        <div class="vi-comment-tools">
          <a class="vi-comment-tool" @click="showComment(-1,comment.author)">
            <i class="icon-comment"></i>&nbsp; 评论
          </a>
        </div>

        <div class="reply-list">
          <div class="reply-item" v-for="c in comment.childrens" :key="c.id">
            <div style="font-size: 14px">
              <span class="reply-user">{{c.author.nickname}}:&nbsp;&nbsp;</span>

              <!-- <span v-if="c.level == 2" class="reply-user">@{{c.toUser.nickname}} </span> -->

              <span>{{c.content}}</span>
            </div>
            <div class="vi-meta">
              <span style="padding-right: 10px">{{c.createDate}}</span>
            </div>

          </div>

          <div class="vi-comment-write" v-show="commentShow">

            <el-input
              v-model="reply.content"
              type="input"
              style="width: 90%"
              :placeholder="placeholder"
              class="vi-comment-text"
              resize="none">
            </el-input>

            <el-button style="margin-left: 8px" @click="publishComment()" type="text">评论</el-button>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {publishComment} from '@/api/comment'

  export default {
    name: "CommentItem",
    props: {
      articleId: Number,
      comment: Object,
      index: Number,
      rootCommentCounts: Number
    },
    data() {
      return {
        placeholder: '你的评论...',
        commentShow: false,
        commentShowIndex: '',
        reply: this.getEmptyReply()
      }
    },
    methods: {
      showComment(commentShowIndex, toUser) {
        this.reply = this.getEmptyReply()

        if (this.commentShowIndex !== commentShowIndex) {
          if (toUser) {
            // this.placeholder = `@${toUser.nickname} `
            this.reply.toUserId = toUser.id
          } else {
            this.placeholder = '你的评论...'
          }

          this.commentShow = true
          this.commentShowIndex = commentShowIndex
        } else {
          this.commentShow = false
          this.commentShowIndex = ''
        }
      },
      publishComment() {
        let that = this;
        let account = localStorage.getItem('account');
        let id = localStorage.getItem('id');
        if(account != null && id != null){
          if (!that.comment.content) {
            return;
          }

          publishComment(that.reply).then((res) => {
            if(res.data.success){
              that.$message({type: 'success', message: '评论成功', showClose: true})
              if(!that.comment.childrens){
                that.comment.childrens = []
              }
              that.comment.childrens.unshift(res.data.data)
              that.$emit('commentCountsIncrement')
              that.showComment(that.commentShowIndex)
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
      getEmptyReply() {
        return {
          articleId: this.articleId,
          parent: this.comment.id,
          toUserId: '',
          content: ''
        }
      }
    }
  }
</script>

<style>

  .contains{
    display: flex;
    align-items: flex-start;
    font: 13px Helvetica, Arial, sans-serif;
    line-height: 1.62;
  }
  .avatarImg{
    margin-right: 10px;
  }
  .viewInfo{
    display:flex;
    background: #F3F5F7;
    padding: 3px 5px;
    margin-bottom: 10px;
    color: #999;
    width:680px;
  }
  .viewInfo .vi-nickname{
    color:#37a;
    margin-right:12px;
  }

  .vi-comment {
    margin-top: 60px;
  }
  
  .vi-comment-title {
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 20px;
  }

  .vi-comment-write {
    margin-top: 20px;
  }

  .vi-comment-text {
    font-size: 16px;
  }

  .v-show-content {
    padding: 8px 25px 15px 30px !important;
  }

  .v-note-wrapper .v-note-panel {
    box-shadow: none !important;
  }

  .vi-comment-item {
    margin-top: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }

  .vi-comment-author {
    margin: 10px 0;
    vertical-align: middle;
    display:flex;

  }

  .vi-comment-content {
    line-height: 1.5;
  }

  .vi-comment-tools {
    margin-top: 4px;
    margin-bottom: 10px;
    text-align: right;
  }

  .vi-comment-tool {
    font-size: 13px;
    color: #a6a6a6;
    padding-right: 14px;
    cursor: pointer;
  }

  .v-note-wrapper .v-note-panel .v-note-show .v-show-content, .v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
    background: #fff !important;
  }

  .reply-list {
    padding-left: 16px;
    border-left: 4px solid #c5cac3;
  }

  .reply-item {
    height: 36px;
    margin-bottom: 8px;
    padding-top:8px;
    border-bottom: 1px solid #f0f0f0;
  }

  .reply-user {
    color: #37a;
    margin-right: 12px;
  }
</style>
