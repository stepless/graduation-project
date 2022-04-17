<template>
  <div class="userL">
    <header class="search">
      <div class="item1">
        <input type="text" v-model="searchData" placeholder="用户名或账号" />
        <button @click="getUserById()" type="button">
          <i class="iconfont icon-sousuo1"></i>
        </button>
      </div>
      <div class="item2">
        <button @click="this.addDialogVisible=true" type="button">添加用户</button>
      </div>
    </header>
    <div class="userShow">
      <div class="userT">
        <table cellspacing="0" cellpadding="0" class="userTable">
          <colgroup>
            <col name="tableColumn1" width="150" />
            <col name="tableColumn2" width="150" />
            <col name="tableColumn3" width="150" />
            <col name="tableColumn4" width="150" />
            <col name="tableColumn5" width="150" />
            <col name="tableColumn6" width="250" />
          </colgroup>
          <thead>
            <tr>
              <th class="tableColumn1">
                <div class="cell">账号</div>
              </th>
              <th class="tableColumn2">
                <div class="cell">昵称</div>
              </th>
              <th class="tableColumn3">
                <div class="cell">性别</div>
              </th>
              <th class="tableColumn4">
                <div class="cell">权限</div>
              </th>
              <th class="tableColumn5">
                <div class="cell">状态</div>
              </th>
              <th class="tableColumn6">
                <div class="cell">操作</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in showUser" :key="index">
              <td class="tableColumn1">
                <div class="cell">{{ user.account }}</div>
              </td>
              <td class="tableColumn2">
                <div class="cell">{{ user.nickname }}</div>
              </td>
              <td class="tableColumn3">
                <div class="cell">{{ user.sex }}</div>
              </td>
              <td class="tableColumn4">
                <div class="cell">
                  <span class="admin" v-if="user.admin == 1">管理员</span>
                  <span class="normal" v-if="user.admin == 0">用户</span>
                </div>
              </td>
              <td class="tableColumn5">
                <div class="cell">
                  <span class="normal" v-if="user.state == 1">正常</span>
                  <span class="prohibition" v-if="user.state == 0">禁用</span>
                </div>
              </td>
              <td class="tableColumn6">
                <div class="cell">
                  <button><i class="iconfont icon-xiugai"></i></button>
                  <button><i class="iconfont icon-jinyong"></i></button>
                  <button><i class="iconfont icon-xiangqing-"></i></button>
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
            @current-change="this.n = (this.queryInfo.pagenum - 1) * 8"
          />
        </div>
    </div>
    <div v-if="this.addDialogVisible" class="addUser">
      <!--内容主体区域-->
      <div class="form">
        <el-form :model="temporary" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="账号" prop="username">
            <el-input v-model="temporary.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="temporary.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="temporary.name"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="temporary.phone" width="90%"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="temporary.email"></el-input>
          </el-form-item>
        </el-form>
        <!--底部区域-->
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
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
      users: [
        {
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
      n:0,
      showUser:[],

      sysUser: {
        id: localStorage.getItem("id"),
      },

      temporary: {
          account: "",
          avatar: "",
          admin: "",
          nickname: "",
          email: "",
          phone: "",
          sex: "",
          brief: "",
          state: "", 
      },
      addDialogVisible: false,
      addFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '用户名在3到10个字之间', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 8, max: 16, message: '密码8~16位', trigger: 'blur'}
        ],
        nickname: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '昵称2~8个字之间', trigger: 'blur'}
        ],
        //自定义手机号码规则
        phone: [{required: true, message: '请输入手机号', trigger: 'blur'},],

        //自定义邮箱规则
        email: [{required: true, message: '请输入邮箱', trigger: 'blur'},]
      },
    };
  },
  watch: {
    n(newQuestion, oldQuestion) {
      this.limitPage(newQuestion);
    }
  },
  mounted(){
    this.limitPage(this.n);
  },
  methods: {
    
    getUserById() {
      alert("查询");
    },
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
  },
};
</script>

<style scoped>
</style>
