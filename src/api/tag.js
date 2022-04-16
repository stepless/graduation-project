import request from "@/request"

export function getAllTags() {
    return request({
        url: '/tags',
        method: 'get',
    })
}

export function getHotTags() {
    return request({
        method: 'get',
        url: '/tags/hot'
    })
}

export function getAllTagsDetail() {
    return request({
        method: 'get',
        url: '/tags/detail'
    })
}

export function getTag(id) {
    return request({
        url: `/tags/${id}`,
        method: 'get',
    })
}

export function getTagDetail(id) {
    return request({
        url: `/tags/detail/${id}`,
        method: 'get',
    })
}