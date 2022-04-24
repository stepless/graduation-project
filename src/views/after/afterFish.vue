<template>
  <div class="userL">
    <header class="search">
      <div class="item2">
        <button
          class="addFish"
          @click="this.addDialogVisible = true"
          type="button"
        >
          添加濒危鱼类
        </button>
      </div>
    </header>
    <div class="userShow">
      <div class="userT">
        <table cellspacing="0" cellpadding="0" class="userTable">
          <colgroup>
            <col name="tableColumn1" width="80" />
            <col name="tableColumn2" width="100" />
            <col name="tableColumn3" width="350" />
            <col name="tableColumn4" width="350" />
            <col name="tableColumn4" width="120" />
          </colgroup>
          <thead>
            <tr>
              <th class="tableColumn1">
                <div class="cell">序号</div>
              </th>
              <th class="tableColumn2">
                <div class="cell">名称</div>
              </th>
              <th class="tableColumn3">
                <div class="cell">分布地区</div>
              </th>
              <th class="tableColumn4">
                <div class="cell">生物学分类</div>
              </th>
              <th class="tableColumn5">
                <div class="cell">操作</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(fish, index) in showFish" :key="index">
              <td class="tableColumn1">
                <div class="cell">{{ index + 1 + this.pageN }}</div>
              </td>
              <td class="tableColumn2">
                <div class="cell">{{ fish.fishName }}</div>
              </td>
              <td class="tableColumn3">
                <div class="cell">{{ fish.region }}</div>
              </td>
              <td class="tableColumn4">
                <div class="cell">{{ fish.classification }}</div>
              </td>
              <td class="tableColumn7">
                <div class="cell">
                  <button @click="openDelete(fish)">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="删除"
                      placement="top-end"
                    >
                      <i class="iconfont icon-shanchu"></i>
                    </el-tooltip>
                  </button>
                  <button @click="openAmend(fish)">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="修改"
                      placement="top"
                    >
                      <i class="iconfont icon-xiugai"></i>
                    </el-tooltip>
                  </button>
                  <button @click="this.openDetail(index)">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      content="详情"
                      placement="top-start"
                    >
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
          <span>共 {{this.fishs.length}} 条</span>
          <el-pagination
            v-model:currentPage="this.queryInfo.pagenum"
            :page-size="this.queryInfo.pagesize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="this.fishs.length"
            @current-change="this.pageN = (this.queryInfo.pagenum - 1) * 8"
          />
        </div>
    </div>
    </div>

    <!-- 添加 -->
    <div v-if="this.addDialogVisible" class="back addUser addFish">
      <!--内容主体区域-->
      <div class="form">
        <el-form
          :model="temporary"
          :rules="addFormRules"
          ref="temporary"
          label-width="70px"
        >
          <el-form-item label="图像" prop="sex"> 
              <input type="text"  v-model="temporary.avatar"/>
              <input type="file" @change="upload" />
          </el-form-item>
          <el-form-item label="名称" prop="fishName">
            <el-input v-model="temporary.fishName"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="introduce">
            <el-input v-model="temporary.introduce"></el-input>
          </el-form-item>
          <el-form-item label="分布地区" prop="region">
            <el-input v-model="temporary.region"></el-input>
          </el-form-item>
          <el-form-item label="生物学分类" prop="classification">
            <el-input v-model="temporary.classification" width="90%"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('temporary')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import { findAllFish,addFish,deleteFish } from '@/api/fish.js'
import {upload} from '@/api/upload'
export default {
    data(){
        return {
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:8,
            },
            pageN:0,
            addDialogVisible:false,

            fishs: [],
            showFish:[],
            temporary: {
                id:1,
                fishName: "",
                avatar: "",
                introduce: "",
                region: "",
                classification: "",
                sketch: "",
            },
            addFormRules: {
                fishName: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                ],
                region: [
                    {required: true, message: '请输入分布地区', trigger: 'blur'},
                ],
                classification: [
                    {required: true, message: '请输入介绍', trigger: 'blur'},
                ]
                
            },
        }
        
    },
    watch: {
        pageN(newQuestion, oldQuestion) {
            this.limitPage(newQuestion);
        }
    },
    mounted(){
        this.findAllFish();
    },
    methods: {
        upload(el){
          let file = el.target.files[0];
          let form = new FormData();
          form.append('image',file);
          upload(form).then((res)=>{
            if(res.data.success){
              console.log(res.data);
              this.temporary.avatar = '/image/' + file.name;
            }else{
               this.$message.error(res.data.msg);
            }
          }).catch((err)=>{
              this.$message.error("系统错误");
          }).finally(()=>{
          })
        },

    // 发起请求
        findAllFish(){
            findAllFish().then((res)=>{
                if(res.data.success){
                    this.fishs = res.data.data;
                    this.limitPage(this.pageN);
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
            })
        },
        addFish(){
            let that = this;
            addFish(that.temporary).then((res)=>{
                if(res.data.success){
                    this.$message.success('保存成功');
                    this.$router.go(0);
                }else{
                    this.$message.error(res.data.msg);
                }
            }).catch((err)=>{
                this.$message.error("系统错误");
            }).finally(()=>{
            })
        },
    },


    limitPage(n){
      this.showFish = [];
      let size = n+8;
      if(this.fishs.length < size){
        for(let i = n; i < this.fishs.length; i++){
          this.showFish.push(this.fishs[i]);
        }
      }else{
        for(let i = n; i < size; i++){
          this.showFish.push(this.fishs[i]);
        }
      }
    },

    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addFish();
          } else {
            return false;
          }
        });
    },
}
</script>

<style scoped>
.addFish .form{
    width:600px;
    height:600px;
    background-color: white;
    border-radius: 8px;
    box-shadow:0 0 2px rgb(190, 190, 190);
    margin-left: auto;
    margin-right: auto;
    margin-top:60px;
}
.el-form >>> .el-form-item textarea{
  resize: none;
}
</style>