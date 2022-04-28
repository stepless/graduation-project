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
              <input id="imgFile1" @change="upload1" type="file" />
          </el-form-item>
          <el-form-item label="剪影图" prop="sex">
              <input id="imgFile2" @change="upload2" type="file" />
          </el-form-item>
          <el-form-item label="名称" prop="fishName">
            <el-input v-model="temporary.fishName"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="introduce">
            <el-input type="textarea" :rows="2" v-model="temporary.introduce"></el-input>
          </el-form-item>
          <el-form-item label="地区" prop="region">
            <el-input v-model="temporary.region"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="classification">
            <el-input v-model="temporary.classification" width="90%"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="shit">取 消</el-button>
            <el-button type="primary" @click="submitForm('temporary')">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 详细信息 -->
    <div v-if="fishMassageVisible" class="back userMessage">
      <div class="details">
        <div class="headImg headI">
          <img :src="this.showFish[this.selectI].avatar" />
        </div>
        <div class="detailsText">
          <ul>
            <li>
              <h3 class="field-label">名称:</h3>
              <div class="field-content">
                {{ this.showFish[this.selectI].fishName }}
              </div>
            </li>
            <li>
              <h3 class="field-label">地区:</h3>
              <div class="field-content">
                {{ this.showFish[this.selectI].region === ''? '空' :this.showFish[this.selectI].region }}
              </div>
            </li>
            <li>
              <h3 class="field-label">生物学分类:</h3>
              <div class="field-content">
                {{ this.showFish[this.selectI].classification === ''? '空' :this.showFish[this.selectI].classification }}
              </div>
            </li>
            
            <li>
              <h3 class="field-label">介绍:</h3>
              <div class="field-content">
                {{ this.showFish[this.selectI].introduce === ''? '空' :this.showFish[this.selectI].introduce }}
              </div>
            </li>
          </ul>
        </div>
        <button @click="this.fishMassageVisible = false" class="shut" type="button">
          关闭
        </button>
      </div>
    </div>

    <!-- 修改 -->
    <div v-if="fishAmendVisible" class="back userMessage">
      <div class="details">
        <div class="headImg headI">
          <img :src="temporary.avatar" />
          <input id="imgFile1" @change="upload" type="file" />
        </div>
        <div class="headImg headImg1 headI">
          <img :src="temporary.sketch" />
          <input id="imgFile1" @change="upload2" type="file" />
        </div>
        
        <div class="detailsText">
          <ul>
            <li>
              <h3 class="field-label">名称:</h3>
              <div class="field-content">
                <input type="text" v-model="temporary.fishName" placeholder="名称" />
              </div>
            </li>
            <li>
              <h3 class="field-label">地区:</h3>
              <div class="field-content">
                  <input type="text" v-model="temporary.region" placeholder="分布地区" />
              </div>
            </li>
            <li>
              <h3 class="field-label">生物学分类:</h3>
              <div class="field-content">
                  <input type="text" v-model="temporary.classification" placeholder="生物学分类" />
              </div>
            </li>
            
            <li>
              <h3 class="field-label">介绍:</h3>
              <div class="field-content">
                <textarea rows="2" class="textarea" v-model="temporary.introduce" placeholder="介绍" />
              </div>
            </li>
          </ul>
        </div>
        <div class="buttonGroup">
          <button @click="notarizeAmend" type="button" class="sava">确认</button>
          <button @click="shutAmend" type="button" class="cancel">取消</button>
        </div>
      </div>
    </div>

</template>

<script>
import { findAllFish,addFish,deleteFish,setFishById } from '@/api/fish.js'
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
            fishMassageVisible:false,
            fishAmendVisible: false,

            fishs: [
              {
                id:1,
                fishName: "",
                avatar: "",
                introduce: "",
                region: "",
                classification: "",
                sketch: "",
              },
            ],
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
                    {required: true, message: '请输入生物学分类', trigger: 'blur'},
                ],
                introduce: [
                    { required: true, message: '请填写介绍', trigger: 'blur' }
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
        upload2(el){
          let file = el.target.files[0];
          let form = new FormData();
          form.append('image',file);
          upload(form).then((res)=>{
            if(res.data.success){
              this.temporary.sketch = res.data.data.url;
            }else{
               this.$message.error(res.data.msg);
            }
          }).catch((err)=>{
              this.$message.error("图片加载失败");
          }).finally(()=>{
          })
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
              this.$message.error("濒危鱼类信息加载失败");
          }).finally(()=>{
          })
        },

        addFish(){
            let that = this; 
            setTimeout(()=>{
              addFish(that.temporary).then((res)=>{
                if(res.data.success){
                  console.log(this.temporary.avatar);
                  this.$message.success('保存成功');
                  this.$router.go(0);
                }else{
                    this.$message.error(res.data.msg);
                }
              }).catch((err)=>{
                  this.$message.error("添加失败");
              }).finally(()=>{
              })
            },0)
            
        },

        deleteFish(fish){
          deleteFish(fish).then((res)=>{
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
        setFishById(){
          setFishById(this.temporary).then((res)=>{
          ////res.data = Result (success,msg,data)
            if(res.data.success){
              this.$router.go(0);
            }else{
                this.$message.error(res.data.msg);
            }
          }).catch((err)=>{
              this.$message.error("系统错误");
          }).finally(()=>{
          })
        },


        // 修改
        openAmend(fish) {
          this.temporary = fish;
          this.fishAmendVisible = true;
        },
        notarizeAmend(){
          this.fishAmendVisible = false;
          this.setFishById();
        },
        shutAmend(){
          this.fishAmendVisible = false;
          this.temporary = {
                id:1,
                fishName: "",
                avatar: "",
                introduce: "",
                region: "",
                classification: "",
                sketch: "",
          };
        },

        openDetail(i){
          this.selectI = i;
          this.fishMassageVisible = true;
        },

        openDelete(fish){
          this.$confirm('是否删除该濒危鱼类信息？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {

              this.deleteFish(fish);
              
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
                fishName: "",
                avatar: "",
                introduce: "",
                region: "",
                classification: "",
                sketch: "",
          };
        },

        submitForm(formName) {
          let that = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              that.addFish();
            } else {
              return false;
            }
          });
        },
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
.userMessage .details .headI{
  display: flex;
  align-items: center;
}
.userMessage .details .headImg input{
  position:absolute;
  left:0px;
  top:180px;
}
.userMessage .details .headImg1{
  top:260px;
  left: 30px;
}
</style>