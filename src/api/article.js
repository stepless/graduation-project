import request from "@/request"

export function getArticles(page) {
	return request({
		  method: 'post',
		  url: '/articles',
		  data: page
	})
}