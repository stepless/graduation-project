<template>
  <div class="cartArticle">
    <div class="category-header">
      <span>{{cardHeader}}</span>
    </div>

    <ul class="category-list">
      <li v-for="a in articles" @click="view(a.id)" :key="a.id" :style="itemStyle" class="category-item">
        <a>{{a.title}}</a>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    name: 'CardArticle',
    props: {
      cardHeader: {
        type: String,
        required: true
      },
      articles: {
        type: Array,
        required: true
      },
      itemStyle: Object
    },
    data() {
      return {}
    },
    methods: {
      view(id) {
        this.$router.push({path: `/view/${id}`})
      }
    }
  }
</script>

<style scoped>
    .cartArticle{
        width:100%;
        margin-top:30px;
        min-height: 160px;
    }
    .category-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font: 16px Arial, Helvetica, sans-serif;
        color: #072;
        margin-bottom:15px;
        border-bottom:1px solid #f0f0f0;
        padding-bottom: 15px;
    }
    .category-list{
      color: #37a;
      line-height: 1;
      font-size: 14px;
    }
    .category-item {
      margin-bottom: 20px;
      cursor: pointer;
      line-height: 1.5;
    }

    .category-item a:hover {
        text-decoration: underline;
    }
</style>