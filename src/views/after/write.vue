<template>
  <div class="userL">
    <div class="writeArticle">
      <div class="writeHeader">
        <div class="write-info">写文章</div>
      </div>
     <div class="form">
        <el-form
          :model="temporary"
          :rules="addFormRules"
          ref="temporary"
          label-width="70px"
        >
          <el-form-item label="标题" prop="title">
            <el-input v-model="temporary.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="摘要" prop="summary">
            <el-input 
              type="textarea"
              :rows="2"
              v-model="temporary.summary"
              placeholder="请输入摘要"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-input
              type="textarea"
              :rows="12"
              placeholder="请输入内容"
              v-model="temporary.content">
            </el-input>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-checkbox-group v-model="temporary.tags">
              <el-checkbox v-for="t in tags" :key="t.id" :label="t.id" name="tags">{{t.tagName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item  class="submit">
            <el-button type="primary" @click="submitForm('temporary')">发 布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {publishArticle} from '@/api/article'
  import {getAllTags} from '@/api/tag'

  export default {
    name: 'articleWrite',
    mounted() {
      this.getTags()
    },
    data() {
      return {
        publishVisible: false,
        tags: [],
        temporary: {
          id: '',
          title: '',
          summary: '',
          tags: [],
          userId: localStorage.getItem('id'),
          content:'',
        },
        addFormRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {max: 80, message: '不能大于80个字符', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入文章内容', trigger: 'blur'},
          ],
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
      publish(temporary) {
        let that = this

        this.$refs[temporary].validate((valid) => {
          if (valid) {

            let tags = this.temporary.tags.map(function (item) {
              return {id: item};
            });

            let article = {
              id: this.temporary.id,
              title: this.temporary.title,
              summary: this.temporary.summary,
              tags: tags,
              body: {
                content: this.temporary.content,
              },
              userId: localStorage.getItem('id'),
            }

            this.publishVisible = false;

            let loading = this.$loading({
              lock: true,
              text: '发布中，请稍后...'
            })

            publishArticle(article).then((res) => {
              if(res.data.success){
                loading.close();
                that.$message({message: '发布成功啦', type: 'success', showClose: true})
                that.$router.push({path: `/view/${res.data.data.id}`})
              }else{
                that.$message({message: error, type: '发布文章失败:'+res.data.msg, showClose: true});
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
      submitForm(temporary) {
        this.$refs[temporary].validate((valid) => {
          if (valid) {
            this.publish(temporary);
          } else {
            return false;
          }
        });
      },
    },
  }
</script>

<style>
  .writeHeader{
    width:980px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom:20px;
  }
  .writeHeader .write-info{
    font-size: 26px;
    font-weight: 500;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }
  .form{
    width:980px;
    margin-left: auto;
    margin-right: auto;
  }
  textarea.el-textarea__inner{
    resize: none;
  }
  .v-note-op {
    box-shadow: none !important;
  }

  .auto-textarea-input, .auto-textarea-block {
    font-size: 18px !important;
  }
  .form .submit{
    padding-left: 810px;
  }
</style>
