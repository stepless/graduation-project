<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './components/header.vue'

export default {
  components:{Header},
  data () {
    return {
      beforeUnloadTime: '',
      gapTime: ''
    }
  },
  mounted () {
    window.addEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.addEventListener('unload', e => this.unloadHandler(e))
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadHandler(e))
    window.removeEventListener('unload', e => this.unloadHandler(e))
  },
  methods: {
    beforeunloadHandler(){
      this.beforeUnloadTime=new Date().getTime();
    },
    unloadHandler(e){
      this.gapTime=new Date().getTime()-this.beforeUnloadTime;
      //判断是窗口关闭还是刷新
      if(this.gapTime<=5){//浏览器关闭
        localStorage.clear();
      }
    }
  },
}
</script>

<style>

</style>
