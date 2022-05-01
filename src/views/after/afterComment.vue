<template>
  <div class="userL">
    <div class="userShow">
      <div class="userT">
        <table cellspacing="0" cellpadding="0" class="userTable">
          <colgroup>
            <col name="tableColumn1" width="80" />
            <col name="tableColumn2" width="150" />
            <col name="tableColumn3" width="200" />
            <col name="tableColumn4" width="150" />
            <col name="tableColumn5" width="120" />
            <col name="tableColumn5" width="150" />
            <col name="tableColumn6" width="100" />
          </colgroup>
          <thead>
            <tr>
              <th class="tableColumn1">
                <div class="cell">序号</div>
              </th>
              <th class="tableColumn2">
                <div class="cell">评论用户</div>
              </th>
              <th class="tableColumn3">
                <div class="cell">文章</div>
              </th>
              <th class="tableColumn4">
                <div class="cell">评论内容</div>
              </th>
              <th class="tableColumn5">
                <div class="cell">层级</div>
              </th>
              <th class="tableColumn6">
                <div class="cell">父评论用户</div>
              </th>
              <th class="tableColumn7">
                <div class="cell">操作</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(comment, index) in showComment" :key="index">
              <td class="tableColumn1">
                <div class="cell">{{ index + 1 + this.pageN }}</div>
              </td>
              <td class="tableColumn2">
                <div class="cell">{{ comment.author.nickname }}</div>
              </td>
              <td class="tableColumn3">
                <div class="cell" :title="articleName(comment.articleId)">{{ articleName(comment.articleId) }}</div>
              </td>
              <td class="tableColumn4">
                <div class="cell">
                  {{ comment.content }}
                </div>
              </td>
              <td class="tableColumn5">
                <div class="cell">
                  {{ comment.level }}
                </div>
              </td>
              <td class="tableColumn5">
                <div class="cell">
                  {{ comment.toUser === null ? "无" : comment.toUser.nickname }}
                </div>
              </td>
              <td class="tableColumn7">
                <div class="cell">
                  <button @click="openDelete(comment)">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="删除"
                      placement="top"
                    >
                      <i class="iconfont icon-shanchu"></i>
                    </el-tooltip>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt">
        <span>共 {{ this.comments.length }} 条</span>
        <el-pagination
          v-model:currentPage="this.queryInfo.pagenum"
          :page-size="this.queryInfo.pagesize"
          :pager-count="11"
          layout="prev, pager, next"
          :total="this.comments.length"
          @current-change="this.pageN = (this.queryInfo.pagenum - 1) * 8"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { findAllComment, deleteComment } from "@/api/comment";
import { getArticles } from "@/api/article";
export default {
  created() {
    this.findAllComment();
    this.getArticles();
  },
  data() {
    return {
      articles: {},
      comments: [],
      showComment: [],
      users: [],
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 8,
      },

      innerPage: {
        page: 1,
        pageSize: 2,
        tagId: null,
      },
      pageN: 0,
      selectI: 0,
      temporary: {
        id: "",
        author: {},
        content: "",
        createDate: "",
        level: 0,
        toUser: {},
      },
    };
  },
  watch: {
    pageN(newQuestion, oldQuestion) {
      this.limitPage(newQuestion);
    },
  },
  methods: {
    getArticles() {
      getArticles(this.innerPage)
        .then((res) => {
          if (res.data.success) {
            this.articles = res.data.data.data;
            console.log(this.articles);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取文章失败");
        })
        .finally(() => {});
    },

    findAllComment() {
      findAllComment()
        .then((res) => {
          if (res.data.success) {
            this.comments = res.data.data;
            this.limitPage(this.pageN);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("获取评论失败");
        })
        .finally(() => {});
    },
    deleteComment(comment) {
      deleteComment(comment)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("删除成功");
            this.$router.go(0);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          this.$message.error("删除失败");
        })
        .finally(() => {});
    },

    openDelete(comment) {
      this.$confirm("是否删除该评论？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          this.deleteComment(comment);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    limitPage(n) {
      this.showComment = [];
      let size = n + 8;
      if (this.comments.length < size) {
        for (let i = n; i < this.comments.length; i++) {
          this.showComment.push(this.comments[i]);
        }
      } else {
        for (let i = n; i < size; i++) {
          this.showComment.push(this.comments[i]);
        }
      }
    },

    articleName(id) {
        let article = '未找到';
        for(let i = 0; i < this.articles.length; i++){
            if(this.articles[i].id === id){
                article = this.articles[i].title;
                return article;
            }
        }
        return article;
    },
  },
};
</script>

<style scoped>
.view-container {
  padding-top: 120px;
  display: flex;
  justify-content: center;
}

.main {
  width: 730px;
  overflow: hidden;
}
.view-card {
  padding-bottom: 60px;
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
  margin-top: 6px;
  font-size: 12px;
  color: #969696;
}

.view-end {
  border-bottom: 1px solid #eee;
  margin: 20px 0;
}

p {
  margin: 0 0 20px 0;
  line-height: 1.8;
  font-size: 14px;
  color: #111;
  word-wrap: break-word;
  white-space: pre-wrap;
}
.tag-list .tag-item {
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
  margin-top: 25px;
}
.tag-item button {
  color: #37a;
  cursor: pointer;
}

.tag-list .tag-item:hover {
  background-color: #e8e8e8;
}
.view-container .main .viewComment {
  text-align: right;
  font-size: 13px;
  margin-bottom: 30px;
  color: #37a;
}
.view-container .main .viewComment span {
  margin-left: 20px;
}
.headImg-write {
  display: flex;
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
  width: 670px;
}
.issue {
  padding-top: 12px;
  text-align: right;
}
.v-show-content {
  padding: 8px 25px 15px 30px !important;
}

.v-note-wrapper .v-note-panel {
  box-shadow: none !important;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content,
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  background: #fff !important;
}
</style>
