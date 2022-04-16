import request from "@/request"

export function getArticles(page) {
    return request({
        method: 'post',
        url: '/articles',
        data: page
    })
}

export function getHotArticles() {
    return request({
        url: '/articles/hot',
        method: 'post'
    })
}

export function getNewArticles() {
    return request({
        url: '/articles/new',
        method: 'post'
    })
}


export function viewArticle(id) {
    return request({
        url: `/articles/view/${id}`,
        method: 'post'
    })
}


export function getArticlesByTag(id) {
    return request({
        url: `/articles/tag/${id}`,
        method: 'post'
    })
}


export function publishArticle(article, token) {
    return request({
        headers: {'Authorization': token},
        url: '/articles/publish',
        method: 'post',
        data: article
    })
}

export function listArchives() {
    return request({
        url: '/articles/listArchives',
        method: 'post'
    })
}

export function getArticleById(id) {
    return request({
        url: `/articles/${id}`,
        method: 'post'
    })
}