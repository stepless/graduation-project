<template>
  <div class="userL">
    <header class="search">
      <!-- <div class="item1">
        <input type="text" v-model="searchData" placeholder="账号" />
        <button @click="getUserById()" type="button">
          <i class="iconfont icon-sousuo1"></i>
        </button>
      </div> -->
      <div class="item2">
        <button @click="this.addDialogVisible=true" type="button">添加用户</button>
      </div>
    </header>
    <div class="userShow">
      <div class="userT">
        <table cellspacing="0" cellpadding="0" class="userTable">
          <colgroup>
            <col name="tableColumn1" width="80" />
            <col name="tableColumn2" width="100" />
            <col name="tableColumn3" width="150" />
            <col name="tableColumn4" width="150" />
            <col name="tableColumn5" width="150" />
            <col name="tableColumn6" width="150" />
            <col name="tableColumn7" width="220" />
          </colgroup>
          <thead>
            <tr>
              <th class="tableColumn1">
                <div class="cell">序号</div>
              </th>
              <th class="tableColumn2">
                <div class="cell">账号</div>
              </th>
              <th class="tableColumn3">
                <div class="cell">昵称</div>
              </th>
              <th class="tableColumn4">
                <div class="cell">性别</div>
              </th>
              <th class="tableColumn5">
                <div class="cell">权限</div>
              </th>
              <th class="tableColumn6">
                <div class="cell">状态</div>
              </th>
              <th class="tableColumn7">
                <div class="cell">操作</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in showUser" :key="index">
              <td class="tableColumn1">
                <div class="cell">{{ (index+1) + this.pageN }}</div>
              </td>
              <td class="tableColumn2">
                <div class="cell">{{ user.account }}</div>
              </td>
              <td class="tableColumn3">
                <div class="cell">{{ user.nickname }}</div>
              </td>
              <td class="tableColumn4">
                <div class="cell">{{ user.sex }}</div>
              </td>
              <td class="tableColumn5">
                <div class="cell">
                  <span class="admin" v-if="user.admin == 1">管理员</span>
                  <span class="normal" v-if="user.admin == 0">用户</span>
                </div>
              </td>
              <td class="tableColumn6">
                <div class="cell">
                  <span class="normal" v-if="user.state == 1">正常</span>
                  <span class="prohibition" v-if="user.state == 0">禁用</span>
                </div>
              </td>
              <td class="tableColumn7">
                <div class="cell">
                  <button @click="openDelete(user)">
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-end">
                        <i class="iconfont icon-shanchu"></i>
                    </el-tooltip>
                  </button>
                  <button v-if="user.state === 0" @click="disableUser(user)">
                    <el-tooltip class="item" effect="dark" content="取消禁用" placement="top">
                      <i class="iconfont icon-jinyong"></i>
                    </el-tooltip>
                  </button>
                  <button v-else @click="openAmend(user)">
                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                      <i class="iconfont icon-xiugai"></i>
                    </el-tooltip>
                  </button>
                  <button @click="this.openDetail(index)">
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
          <span>共 {{this.users.length}} 条</span>
          <el-pagination
            v-model:currentPage="this.queryInfo.pagenum"
            :page-size="this.queryInfo.pagesize"
            :pager-count="11"
            layout="prev, pager, next"
            :total="this.users.length"
            @current-change="this.pageN = (this.queryInfo.pagenum - 1) * 8"
          />
        </div>
    </div>
  
    <!-- 添加用户 -->
    <div v-if="this.addDialogVisible" class="back addUser">
      <!--内容主体区域-->
      <div class="form">
        <el-form :model="temporary" :rules="addFormRules" ref="temporary" label-width="70px">
          <el-form-item label="头像" prop="sex">
            <div class="headImg">
                <img :src="temporary.avatar" />
                <div class="figure">
                    <i class="iconfont icon-w_xiangpian"></i><br/>
                    更换
                </div>
                <div class="selectImg">
                    <ul class="headPortraits clearfix">
                        <li v-for="key in this.headPortrait" :key="key">
                            <img @click="cutImg(key.url)" :src="key.url" />
                        </li>
                    </ul>
                </div>
            </div>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="temporary.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="权限" prop="admin">
            <el-radio-group v-model="temporary.admin">
              <el-radio label="0">用户</el-radio>
              <el-radio label="1">管理员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input v-model="temporary.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="temporary.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="temporary.nickname"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="temporary.phone" width="90%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="temporary.email"></el-input>
          </el-form-item>
          <el-form-item label="介绍" prop="brief">
            <el-input type="textarea" :rows="2" v-model="temporary.brief"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('temporary')">确 定</el-button>
          </el-form-item>
        </el-form>
        
      </div>
    </div>

    <!-- 用户详情 -->
    <div v-if="userMassageVisible" class="back userMessage">
      <div class="details">
        <div class="headImg">
          <img :src="this.showUser[this.selectI].avatar" />
        </div>
        <div class="detailsText">
          <ul>
            <li>
              <h3 class="field-label">账号:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].account }}
              </div>
            </li>
            <li>
              <h3 class="field-label">昵称:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].nickname }}
              </div>
            </li>
            <li>
              <h3 class="field-label">性别:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].sex }}
              </div>
            </li>
            <li>
              <h3 class="field-label">手机号:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].phone  === ''? '空' :this.showUser[this.selectI].phone }}
              </div>
            </li>
            <li>
              <h3 class="field-label">邮箱:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].email === ''? '空' :this.showUser[this.selectI].email }}
              </div>
            </li>
            <li>
              <h3 class="field-label">介绍:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].brief === ''? '空' :this.showUser[this.selectI].brief }}
              </div>
            </li>
            <li>
              <h3 class="field-label">权限:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].admin === 0? '用户' : '管理员'}}
              </div>
            </li>
            <li>
              <h3 class="field-label">状态:</h3>
              <div class="field-content">
                {{ this.showUser[this.selectI].state === 0? '禁用' : '正常'}}
              </div>
            </li>
          </ul>
        </div>
        <button @click="this.userMassageVisible = false" class="shut" type="button">
          关闭
        </button>
      </div>
    </div>

    <!-- 修改用户信息 -->
    <div v-if="userAmendVisible" class="back amend">
      <div class="details amends">
        <div class="headImg">
          <img :src="this.temporary.avatar" />
          <div class="figure">
              <i class="iconfont icon-w_xiangpian"></i><br/>
              修改头像
          </div>
          <div class="selectImg">
              <ul class="headPortraits clearfix">
                  <li v-for="key in this.headPortrait" :key="key">
                      <img @click="cutImg(key.url)" :src="key.url" />
                  </li>
              </ul>
          </div>
        </div>
        <div class="detailsText">
          <ul>
            <li>
              <h3 class="field-label">账号:</h3>
              <div class="field-content">
                <input type="text" v-model="temporary.account" placeholder="账号" />
              </div>
            </li>
            <li>
              <h3 class="field-label">昵称:</h3>
              <div class="field-content">
                <input type="text" v-model="temporary.nickname" placeholder="昵称" />
              </div>
            </li>
            <li>
              <h3 class="field-label">性别:</h3>
              <div class="field-content">
                <input type="radio" name="sex" value="男" v-model="temporary.sex">
                男
                <input type="radio" name="sex" value="女" v-model="temporary.sex">
                女
              </div>
            </li>
            <li>
              <h3 class="field-label">手机号:</h3>
              <div class="field-content">
                <input type="text" v-model="temporary.phone" placeholder="手机号" />
              </div>
            </li>
            <li>
              <h3 class="field-label">邮箱:</h3>
              <div class="field-content">
                  <input type="text" v-model="temporary.email" placeholder="邮箱" />
              </div>
            </li>
            <li>
              <h3 class="field-label">介绍:</h3>
              <div class="field-content">
                <textarea rows="2" class="textarea" v-model="temporary.brief" placeholder="介绍" />
              </div>
            </li>
            <li>
              <h3 class="field-label">权限:</h3>
              <div class="field-content">
                <input type="radio" name="admin" value="1" v-model="temporary.admin">
                管理员
                <input type="radio" name="admin" value="0" v-model="temporary.admin">
                用户
              </div>
            </li>
            <li>
              <h3 class="field-label">状态:</h3>
              <div class="field-content">
                <input type="radio" name="state" value="1" v-model="temporary.state">
                正常
                <input type="radio" name="state" value="0" v-model="temporary.state">
                禁用
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
  </div>
</template>

<script>
import "@/assets/css/userList.css";
import {findAllUser, addUser, disableUser, deleteUser,setUser} from '@/api/user.js'
export default {
  data() {
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:8,
      },
      searchData: "",

      users: [
        {
          id:1,
          account: "user",
          avatar: "",
          admin: "1",
          nickname: "一条马路1",
          email: "411131038@qq.com",
          phone: "15893817215",
          sex: "女",
          brief: "一条马路",
          state: "1",
        },
      ],
      showUser:[],

      pageN:0,
      selectI:0,

      temporary: {
          id:1,
          account: "",
          avatar: "/static/user/dog.jpg",
          admin: "0",
          nickname: "",
          email: "",
          phone: "",
          sex: "男",
          brief: "",
          state: "", 
      },
      
      userMassageVisible:false,
      addDialogVisible: false,
      userAmendVisible: false,

      addFormRules: {
        account: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, max: 10, message: '账号3~10位', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 16, message: '密码8~16位', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 8, message: '昵称2~8个字之间', trigger: 'blur'}
        ],
        phone: [{required: true, message: '请输入手机号', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'}
        ],
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 6, max: 20, message: '请输入正确的邮箱', trigger: 'blur'}
        ],
        brief: [
          { required: true, message: '请填写介绍', trigger: 'blur' }
        ]
      },
      headPortrait:[
          {url:'/static/user/user_1.jpg'},
          {url:'/static/user/user_2.jpg'},
          {url:'/static/user/user_3.jpg'},
          {url:'/static/user/user_4.jpg'},
          {url:'/static/user/user_5.jpg'},
          {url:'/static/user/user_6.jpg'},
          {url:'/static/user/dog.jpg'}
      ],

    };
  },
  watch: {
    pageN(newQuestion, oldQuestion) {
      this.limitPage(newQuestion);
    }
  },
  mounted(){
    this.findAllUser();
  },
  methods: {
    // 发起请求
    findAllUser(){
      findAllUser().then((res)=>{
				if(res.data.success){
              this.users = res.data.data;
              this.limitPage(this.pageN);
          }else{
              this.$message.error(res.data.msg);
          }
      }).catch((err)=>{
          this.$message.error("系统错误");
      }).finally(()=>{
			})
    },
    addUser(){
      let that = this;
      addUser(that.temporary).then((res)=>{
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
    disableUser(user){
      disableUser(user).then((res)=>{
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
    deleteUser(user){
      deleteUser(user).then((res)=>{
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
    setUser(){
      setUser(this.temporary).then((res)=>{
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

    // 分页
    limitPage(n){
      this.showUser = [];
      let size = n+8;
      if(this.users.length < size){
        for(let i = n; i < this.users.length; i++){
          this.showUser.push(this.users[i]);
        }
      }else{
        for(let i = n; i < size; i++){
          this.showUser.push(this.users[i]);
        }
      }
    },
    cutImg(url){
      this.temporary.avatar = url;
    },

    // 打开用户信息
    openDetail(i){
      this.selectI = i;
      this.userMassageVisible = true;
    },

    // 修改
    openAmend(user) {
      this.temporary = user;
      this.userAmendVisible = true;
    },
    notarizeAmend(){
      this.userAmendVisible = false;
      this.setUser();
    },
    shutAmend(){
      this.userAmendVisible = false;
      this.temporary = {
          id:1,
          account: "",
          avatar: "/static/user/dog.jpg",
          admin: "0",
          nickname: "",
          email: "",
          phone: "",
          sex: "男",
          brief: "",
          state: "", 
      };
    },
    //删除确认
    openDelete(user){
      this.$confirm('是否删除该用户？', '提示', {
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

    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addUser();
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
</style>
