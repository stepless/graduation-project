import request from "@/request"

export function findAllFish() {
    return request({
        method: 'get',
        url: '/fish/get',
    })
}

export function addFish(fish){
    return request({
        method: 'post',
        url: '/fish/add',
        data:fish,
    })
}

export function deleteFish(fishId){
    return request({
        method: 'post',
        url: '/fish/delete',
        data:fishId,
    })
}

export function findFishById(id) {
    return request({
        url: `/fish/show/${id}`,
        method: 'post'
    })
}

export function setFishById(fish){
    return request({
        url: `/fish/set`,
        method: 'post',
        data:fish
    })
}