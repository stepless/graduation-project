<template>
  <div id="write">
    <div class="contains">
      <h1 class="title">添加文章</h1>

      <div>

        <el-form :model="articleForm" ref="articleForm" :rules="rules">
          <el-form-item prop="title">
            <el-input resize="none"
                      type="textarea"
                      v-model="articleForm.title"
                      placeholder="请输入标题"
                      class="write-input">
            </el-input>
          </el-form-item>
          <div class="write-content">
            
          </div>
          <el-form-item prop="summary">
            <el-input type="textarea"
                      v-model="articleForm.summary"
                      :rows="6"
                      placeholder="请输入摘要">
            </el-input>
          </el-form-item>

          <el-form-item label="文章标签" prop="tags">
            <el-checkbox-group v-model="articleForm.tags">
              <el-checkbox v-for="t in tags" :key="t.id" :label="t.id" name="tags">{{t.tagName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button @click="publishVisible = false">取 消</el-button>
          <el-button type="primary" @click="publish('articleForm')">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {publishArticle, getArticleById} from '@/api/article'
  import {getAllTags} from '@/api/tag'

  export default {
    name: 'BlogWrite',
    mounted() {

      if(this.$route.params.id){
        this.getArticleById(this.$route.params.id)
      }
      this.getTags()
    },
    data() {
      return {
        publishVisible: false,
        tags: [],
        articleForm: {
          id: '',
          title: '',
          summary: '',
          tags: [],
        },
        rules: {
          summary: [
            {required: true, message: '请输入摘要', trigger: 'blur'},
            {max: 80, message: '不能大于80个字符', trigger: 'blur'}
          ],
          tags: [
            {type: 'array', required: true, message: '请选择标签', trigger: 'change'}
          ]
        }
      }
    },
    methods: {
      getArticleById(id) {
        let that = this
        getArticleById(id).then(data => {

          Object.assign(that.articleForm, data.data)
          that.articleForm.editor.value = data.data.body.content

          let tags = this.articleForm.tags.map(function (item) {
            return item.id;
          })

          this.articleForm.tags = tags


        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败', showClose: true})
          }
        })
      },
      publishShow() {
        if (!this.articleForm.title) {
          this.$message({message: '标题不能为空哦', type: 'warning', showClose: true})
          return
        }

        if (this.articleForm.title.length > 30) {
          this.$message({message: '标题不能大于30个字符', type: 'warning', showClose: true})
          return
        }

        if (!this.articleForm.editor.ref.d_render) {
          this.$message({message: '内容不能为空哦', type: 'warning', showClose: true})
          return
        }

        this.publishVisible = true;
      },
      publish(articleForm) {

        let that = this

        this.$refs[articleForm].validate((valid) => {
          if (valid) {

            let tags = this.articleForm.tags.map(function (item) {
              return {id: item};
            });

            let article = {
              id: this.articleForm.id,
              title: this.articleForm.title,
              summary: this.articleForm.summary,
              category: this.articleForm.category,
              tags: tags,
              body: {
                content: this.articleForm.editor.value,
                contentHtml: this.articleForm.editor.ref.d_render
              }

            }

            this.publishVisible = false;

            let loading = this.$loading({
              lock: true,
              text: '发布中，请稍后...'
            })

            publishArticle(article,this.$store.state.token).then((data) => {
              if(data.success){
                loading.close();
                that.$message({message: '发布成功啦', type: 'success', showClose: true})
                that.$router.push({path: `/view/${data.data.id}`})
              }else{
                that.$message({message: error, type: '发布文章失败:'+data.msg, showClose: true});
              }

            }).catch((error) => {
              loading.close();
              if (error !== 'error') {
                that.$message({message: error, type: 'error', showClose: true});
              }
            })

          } else {
            return false;
          }
        });
      },
      cancel() {
        this.$confirm('文章将不会保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/')
        })
      },
      getTags() {
        let that = this
        getAllTags().then((res) => {
          if(res.data.success){
            that.tags = res.data.data
          }else{
             that.$message({type: 'error', message: '标签加载失败', showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '标签加载失败', showClose: true})
          }
        })

      },
    },
  }
</script>

<style>
  #write .contains{
    padding: 40px 30px;
    box-shadow:0px 0px 2px rgb(157, 157, 157);
    border-radius: 6px;
    min-width: 1048px;
    height: 618px;
  }
  #write .contains h1.title{
    font-size: 24px;
  }
  .el-header {
    position: fixed;
    z-index: 1024;
    min-width: 100%;
    box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }

  .write-info {
    line-height: 60px;
    font-size: 18px;
    font-weight: 600;
  }

  .write-btn {
    margin-top: 10px;
  }

  

  .write-main {
    padding: 0;
  }

  .write-input textarea {
    font-size: 32px;
    font-weight: 600;
    height: 20px;
  }

  .write-editor {
    min-height: 650px !important;
  }

  .header-left {
    margin-top: 10px;
  }

  .title img {
    max-height: 2.4rem;
    max-width: 100%;
  }

  .write-toolbar-fixed {
    position: fixed;
    width: 700px !important;
    top: 60px;
  }

  .v-note-op {
    box-shadow: none !important;
  }

  .auto-textarea-input, .auto-textarea-block {
    font-size: 18px !important;
  }
</style>
