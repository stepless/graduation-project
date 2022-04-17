import request from "@/request"

export function getUser(user) {
    return request({
        method: 'post',
        url: '/user',
        data:user,
    })
}

export function setUser(user) {
    return request({
        method: 'post',
        url: '/user/set',
        data:user,
    })
}
export function findAllUser() {
    return request({
        method: 'get',
        url: '/user/get',
    })
}