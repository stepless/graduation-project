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
        this.$router.push('/tag/all')
      },
      tag(id) {
        this.$router.push({path: `/tag/${id}`})
      }
    }
  }
</script>

<style scoped>
    .cartTag{
        width:100%;
        border:1px solid red;
        margin-top:30px;
    }
    .tag-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font: 15px Arial, Helvetica, sans-serif;
        color: #072;
        margin-bottom:12px;
    }

    .tag-more{
        font-size: 12px;
        color: #999;
        cursor: pointer;
    }
    .tag-more:hover{
        color:#37a;
    }

    .tag-item {
        display: inline-block;
        padding: 4px;
        font-size: 14px;
        color: #5FB878;
    }

    .tag-item a:hover {
        text-decoration: underline;
    }
</style>