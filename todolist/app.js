import Vue from 'vue';
import AV from 'leancloud-storage'

var APP_ID = 'Gdou7D09Em0cGH4U9WXQCKvT-gzGzoHsz';
var APP_KEY = 'XxRnz14QTeasIsPqwqJGjcmc';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});


var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: [],
    actionType: 'login',
    formData: {
      username: '',
      password: ''
    },
    currentUser: null,
    isMove:false
  },
  created: function () {
    this.currentUser = this.getCurrentUser();
    if (this.currentUser) {
      var query = new AV.Query('AllTodos');
      query.find().then((todos) => {
        console.log(todos)
        let avAllTodos = todos[0] // 理论上 AllTodos 只有一个，所以我们取结果的第一项
        let id = avAllTodos.id
        this.todoList = JSON.parse(avAllTodos.attributes.content)
        this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
        console.log(this.todoList);
      })
    }

    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  },
  methods: {
    updateTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      let avTodos = AV.Object.createWithoutData('AllTodos', this.todoList.id)
      avTodos.set('content', dataString)
      avTodos.save().then(() => {
        console.log('更新成功')
      })
    },
    saveTodos: function () {
      let dataString = JSON.stringify(this.todoList)
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      var acl = new AV.ACL();
      acl.setReadAccess(AV.User.current(), true);// 只有这个 user 能读
      acl.setWriteAccess(AV.User.current(), true);// 只有这个 user 能写
      avTodos.set('content', dataString);
      avTodos.setACL(acl); // 设置访问控制
      avTodos.save().then((todo) => {
        this.todoList.id = todo.id
        console.log('保存成功');
      }, function (error) {
        alert('保存失败');
      });
    },
    saveOrUpdateTodos: function () {
      if (this.todoList.id) {
        this.updateTodos()
      } else {
        this.saveTodos()
      }
    },
    addTodo: function () {
      this.todoList.push({
        title: this.newTodo,
        createdAt: new Date().Format("yyyy-MM-dd hh:mm:ss"),
        done: false
      })
      this.newTodo = '';
      this.saveOrUpdateTodos();
    },
    removeTodo: function (todo) {
      let index = this.todoList.indexOf(todo);
      this.todoList.splice(index, 1);
      this.saveOrUpdateTodos();
    },
    signUp: function () {
      // 新建 AVUser 对象实例
      var user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // 设置密码
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function (error) {
        alert('该用户名已经被注册')
      });
    },
    login: function () {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
        var query = new AV.Query('AllTodos');
        query.find().then((todos) => {
          let avAllTodos = todos[0] // 理论上 AllTodos 只有一个，所以我们取结果的第一项
          let id = avAllTodos.id
          this.todoList = JSON.parse(avAllTodos.attributes.content)
          this.todoList.id = id // 为什么给 todoList 这个数组设置 id？因为数组也是对象啊
        })
      }, function (error) {
        alert('登录失败')
      });
    },
    getCurrentUser: function () {
      let current = AV.User.current()
      if (current) {
        let { id, createdAt, attributes: { username } } = current
        return { id, username, createdAt }
      } else {
        return null
      }
    },
    logout: function () {
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()
    },
    clickCheckbox:function(todo){
      let index = this.todoList.indexOf(todo);
      this.todoList[index].done=!this.todoList[index].done
      this.updateTodos();
    }
  }
})  