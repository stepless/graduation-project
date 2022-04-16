<template>
  <div class="cartTag">
    <div class="tag-header">
      <span>最热标签······</span>
      <a @click="moreTags" class="pull-right tag-more">查看全部</a>
    </div>

    <ul class="tag-list">
      <li class="tag-item" v-for="t in tags" :key="t.id">
        <!--type="primary"-->
        <button @click="tag(t.id)" type="button">{{t.tagName}}</button>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    props: {
      tags: Array
    },
    data() {
      return {}
    },
    methods: {
      moreTags() {
        this.$router.push('/hotspot/tag/all')
      },
      tag(id) {
        this.$router.push({path: `/hotspot/tag/${id}`})
      }
    }
  }
</script>

<style scoped>
    .cartTag{
        width:100%;
        margin-top:30px;
        min-height: 160px;
    }
    .tag-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font: 15px Arial, Helvetica, sans-serif;
        color: #072;
        margin-bottom:15px;
        border-bottom:1px solid #f0f0f0;
        padding-bottom: 15px;
    }

    .tag-more{
        font-size: 12px;
        color: #999;
        cursor: pointer;
    }
    .tag-more:hover{
        color:#37a;
    }
    .tag-list .tag-item{
      display: inline-block;
      color: #ccc;
      border: 1px solid #e5e5e5;
      border-radius: 2px;
      padding: 0 10px;
      line-height: 21px;
      margin-bottom: 12px;
      margin-right: 10px;
      font-size: 13px;
    }
    .tag-item button{
        color: #37a;
        cursor: pointer;
    }

    .tag-item button:hover {
        color: #494949;
    }
</style>