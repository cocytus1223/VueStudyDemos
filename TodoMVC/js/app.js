(function (window) {
	'use strict';

	// 页面加载的时候，获取到localStorage中的数据
	let list = JSON.parse(localStorage.getItem('todoList')) || []
	// Your starting point. Enjoy the ride!
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list,
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
		},
		computed: {
			leftCount() {
				return this.list.filter(item => !item.completed).length
			},
			isShowClear() {
				return this.list.some(item => item.completed)
			},
			isShowFooter() {
				return this.list.length > 0
			}
		},
		watch: {
			list: {
				handler(value) {
					console.log('发生了改变', value)
					// localStorage只能存储字符串类型，复杂类型需要转成字符串
					localStorage.setItem('todoList', JSON.stringify(value))
				},
				deep: true
			}
		}
	})
})(window);
