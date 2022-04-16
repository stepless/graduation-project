<template>
    <div class="page">
        <Header />
        <div class="contains">
            <div class="author-tool">
                <i @click="showTool(qq)" :title="qq.title" class="iconfont icon-qq"></i>
                <i @click="showTool(zhihu)" :title="zhihu.title" class="iconfont icon-zhihu-circle-fill"></i>
            </div>
        </div>
    </div>

</template>

<script>
import Header from "../components/header.vue"
export default {
    components:{Header,},
    data() {
      return {
        qq: {title: 'QQ', message: '2411131038'},
        zhihu: {
          title: '知乎',
          message: '<a target="_blank" href="https://www.zhihu.com/people/ming-jue-li-44">https://www.zhihu.com/people/ming-jue-li-44</a>'
        }
      }
    },
    methods: {
      showTool(tool) {
        this.$message({
          duration: 0,
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: '<strong>' + tool.message + '</strong>'
        });
      }
    }
}
</script>


<style scoped>
.contains{
    padding-top: 120px;
}
.icon-job {
    padding-left: 16px;
}

.author-tool {
    text-align: center;
    padding-top: 10px;
}

.author-tool i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 30px;
}
</style>