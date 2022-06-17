<template>
  <div class="userL">
    <header class="search">
      <div class="item2">
        <button @click="this.addDialogVisible=true" type="button">添加标签</button>
      </div>
    </header>
    <div class="userShow">
      <div class="userT">
        <ul class="tagList">
            <li v-for="(tag,index) in tags" :key="index">
                <div class="tag-img">
                    <img class="tagImg" :src="tag.avatar" />
                </div>
                <div class="tag-text">
                    <span>{{ tag.tagName }}</span>
                </div>
                <div class="deleteTag">
                  <button @click="openDelete(tag)">
                    <i class="iconfont icon-shanchu"></i>
                  </button>
                </div>
            </li>
        </ul>   
      </div>
    </div>
  
    <!-- 添加标签 -->
    <div v-if="this.addDialogVisible" class="back addUser addTag">
      <!--内容主体区域-->
      <div class="form">
        <el-form
          :model="temporary"
          :rules="addFormRules"
          ref="temporary"
          label-width="70px"
        >
          <el-form-item label="图片" prop="avatar">
              <a href="javascript:;" class="file">
              <input id="imgFile1" @change="upload1" type="file" />上传图片
              </a>
              {{temporary.avatar}}
          </el-form-item>
          <el-form-item label="名称" prop="tagName">
            <el-input v-model="temporary.tagName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="shit">取 消</el-button>
            <el-button type="primary" @click="submitForm('temporary')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {getAllTags,deleteTag,addTag} from '@/api/tag.js'
import {upload} from '@/api/upload'
export default {
  data() {
    return {
      tags: [
        {
          tagName: "",
          avatar: "", 
        },

      ],
      temporary: {
          tagName: "",
          avatar: "", 
      },
      
      addDialogVisible: false,

      addFormRules: {
        tagName: [
          {required: true, message: '请输入标签名', trigger: 'blur'},
          {min: 2, max: 10, message: '2~10位', trigger: 'blur'}
        ],
      },

    };
  },
  mounted(){
    this.getAllTags();
  },
  methods: {

    upload1(el){
        let file = el.target.files[0];
        let form = new FormData();
        form.append('image',file);
        upload(form).then((res)=>{
        if(res.data.success){
            this.temporary.avatar = res.data.data.url;
        }else{
            this.$message.error(res.data.msg);
        }
        }).catch((err)=>{
            this.$message.error("图片加载失败");
        }).finally(()=>{
        })
    },

    // 发起请求
    getAllTags(){
        getAllTags().then((res)=>{
            if(res.data.success){
                this.tags = res.data.data;
            }else{
                this.$message.error(res.data.msg);
            }
        }).catch((err)=>{
            this.$message.error("标签加载错误");
        }).finally(()=>{
        })
    },
    addTag(){
      let that = this;
      addTag(that.temporary).then((res)=>{
            if(res.data.success){
                this.$message.success('保存成功');
                this.$router.go(0);
            }else{
                this.$message.error(res.data.msg);
            }
        }).catch((err)=>{
            this.$message.error("保存失败");
        }).finally(()=>{
                })
    },
    deleteTag(tag){
      deleteTag(tag).then((res)=>{
        if(res.data.success){
            this.$message.success("删除成功");
              this.$router.go(0);
          }else{
              this.$message.error(res.data.msg);
          }
      }).catch((err)=>{
          this.$message.error("删除失败");
      }).finally(()=>{
      });
    },

    //删除确认
    openDelete(tag){
      this.$confirm('是否删除该标签？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {

          this.deleteTag(tag);
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },

    shit(){
        this.addDialogVisible = false;
        this.temporary = {
            id:1,
            tagName: "",
            avatar: "", 
        };
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addTag();
          } else {
            return false;
          }
        });
      },
  }
};
</script>

<style scoped>
.el-form >>> .el-form-item textarea{
  resize: none;
}
.userT{
    height: 518px;
    overflow-y:auto ;
    padding:30px;
    font-family: 'Courier New', Courier, monospace;
}
.userT .tagList{
    display: flex;
    flex-wrap:wrap;
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
}
.userT .tagList li{
    width: 168px;
    margin-right: 40px;
    margin-bottom: 30px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
}
.userT .tagList li:nth-of-type(5){
    margin-right: 0px;
}
.userT .tagList li .tag-img .tagImg{
    width: 168px;
    height: 168px;
    border-radius: 8px;
}
.userT .tagList li .tag-text{
    text-align: center;
    font-size: 24px;
    margin: 10px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding:0 5px;
}
.userT .tagList li:hover .deleteTag{
    display: flex;
}
.userT .tagList li .deleteTag{
    position:absolute;
    left:0px;
    top:0px;
    background-color: rgba(0,0,0,0.2);
    width:168px;
    height: 220px;
    align-items: center;
    justify-content: center;
    display: none;
}
.userT .tagList li .deleteTag button{
    background-color: #0000;
    cursor: pointer;
}
.userT .tagList li .deleteTag button:hover{
    color:white;
}
.userT .tagList li .deleteTag button i{
    font-size: 62px;

}
/* 滚动条样式 */
.userT::-webkit-scrollbar {
    width: 4px;     
    height: 4px;
    scrollbar-arrow-color:red;

}
.userT::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
    scrollbar-arrow-color:red;
}
.userT::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    cursor: pointer;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
.addTag .form{
    margin-top:220px;
}
</style>
