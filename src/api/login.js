import request from '@/request'

export function login(userFrom) {
    return request({
        url: '/login',
        method: 'post',
        data:userFrom
    })
}

export function register(userFrom) {
    return request({
        url: '/register',
        method: 'post',
        data:userFrom
    })
}
