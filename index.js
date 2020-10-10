    //利用html5提供的localStorage保存数据
var STORAGE_KEY = 'todos-vuejs'//名称
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}		

		
var vm=new Vue({
  el: '#vue-todolist',
  data: {
    //使用fetch方法直接从localStorage中取出数据
  	items:todoStorage.fetch(),
  	inputValue:""
  },
  mounted:function(){

  },
  methods:{
    //添加清单项
  	add:function(){
  		var _this=this;
  		if(this.inputValue==''){
            alert('添加内容不能为空！请重新输入！');
         }else{
            this.items.push({text:this.inputValue});
         };
      },
    //删除清单项
    remove: function (todo) {
      this.items.splice(this.items.indexOf(todo), 1)
    }
  },
    //设置内部数据监听
  watch:{
  	items:{
  		handler:function(items){
  			todoStorage.save(items)
  		},
  		deep:true
  	}
  }
})