(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list: [{
				id: 1,
				name: '吃饭',
				completed: true
			}, {
				id: 2,
				name: '睡觉',
				completed: false
			}, {
				id: 3,
				name: '敲代码',
				completed: false
			}],
			todoName: '',
			clickId: -1
		},
		methods: {
			HandlerAddTodo() {
				// 增加功能
				// 获取到input框的value值
				// 给list添加一个list
				this.list.unshift({
					id: +new Date(),
					name: this.todoName,
					completed: false
				})
				// 清空input的值
				this.todoName = ''
			},
			HandlerDelTodo(id) {
				// console.log(id);
				// 根据id删除数组中对应的值
				let idx = this.list.findIndex(item => item.id === id)
				this.list.splice(idx, 1)
			},
			HandlerShowTodo(id) {
				this.clickId = id
			},
			HandlerUpdateTodo() {
				// 只需要隐藏editing
				this.clickId = -1
			},
			HandlerClearTodo() {
				this.list = this.list.filter(item => !item.completed)
			}
		}
	})
})(window);
