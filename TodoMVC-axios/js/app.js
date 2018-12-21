const vm = new Vue({
	el: '.todoapp',
	data: {
		list: [],
		url: 'http://localhost:3000/todos/',
		todoName: '',
		clickId: -1
	},
	created() {
		this.getTodoList()
	},
	methods: {
		getTodoList() {
			axios({
				method: 'get',
				url: this.url
			}).then(res => {
				this.list = res.data
			})
		},
		addTodo() {
			axios({
				method: 'post',
				url: this.url,
				data: {
					name: this.todoName,
					completed: false
				}
			}).then(res => {
				this.getTodoList()
				this.todoName = ''
			})
		},
		delTodo(id) {
			axios({
				method: 'delete',
				url: this.url + id
			}).then(res => {
				this.getTodoList()
			})
		},
		changeState(id, state) {
			axios({
				method: 'patch',
				url: this.url + id,
				data: {
					completed: state
				}
			}).then(res => {
				this.getTodoList()
			})
		},
		showEdit(id) {
			this.clickId = id
		},
		updateTodo(id, name) {
			axios({
				method: 'patch',
				url: this.url + id,
				data: {
					name
				}
			}).then(res => {
				this.getTodoList()
				this.clickId = -1
			})
		},
		clearTodo() {
			this.list.filter(item => item.completed).forEach(item => this.delTodo(item.id))
		}
	},
	computed: {
		isShowFooter() {
			return this.list.length > 0
		},
		leftCount() {
			return this.list.filter(item => !item.completed).length
		},
		isShowClear() {
			return this.list.some(item => item.completed)
		}
	}
})
