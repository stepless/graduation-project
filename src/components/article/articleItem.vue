<template>
    <div class="card">
        <div class="article-header clearfix">
            <a @click="view(id)">{{ title }}</a>
            <span class="pull-right article-count">
                <i class="icon-comment"></i>&nbsp;{{ commentCounts }}
            </span>
            <span class="pull-right article-count">
                <i class="iconfont icon-yanjing"></i>&nbsp;{{ viewCounts }}
            </span>
        </div>

        <div @click="view(id)" class="article-description">
            {{summary}}
        </div>
        <div class="article-footer">
            <div>
                <span class="article-author">
                    <i class="icon-author"></i><span class="tag-author">{{ author }}</span>
                </span>
                <div class="tag" v-for="t in tags" :key="t.tagName">{{t.tagName}}</div>
            </div>
            <span class="pull-right article-count">
                <i class="iconfont icon-shizhong1"></i>&nbsp;{{ createDate}}
            </span>
        </div>
    </div>
</template>

<script>
import "@/assets/css/articleItem.css"
export default {
    data(){
        return {
            
        }
    },
    props : {
        id: String,
        weight: Number,
        title: String,
        commentCounts: Number,
        viewCounts: Number,
        summary: String,
        author: String,
        createDate: String,
        tags: Array,
    },
    methods : {
        view(id){
            this.$router.push({path: `/view/${id}`})
        },
    }
}
</script>
<style scoped>
</style>