import request from '@/request'


export function getCommentsByArticle(id) {
    return request({
        url: `/comments/article/${id}`,
        method: 'get'
    })
}

export function publishComment(comment) {
    return request({
        url: '/comments/create/change',
        method: 'post',
        data: comment
    })
}

export function findAllComment() {
    return request({
        url: '/comments',
        method: 'get',
    })
}

export function deleteComment(comment) {
    return request({
        url: '/comments/delete',
        method: 'post',
        data:comment
    })
}
