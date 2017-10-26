define(['lib/backbone','js/list/list','js/layer/layer','js/collection/collection'],function(Backbone,List,Layer,ImageCollection){
	var ic = new ImageCollection();
	var list = new List({
		el:'#app',
		collection:ic
	})
	
	var layer = new Layer({
		el:'#app',
		collection:ic
	})
	//定义路由类
	var Router = Backbone.Router.extend({
		routes:{
			'layer/:id': 'showLayer',
			'*other':'showList'
		},
		showLayer:function(id){
			layer.render(id);
			$('#layer').show();
			$('#list').hide();
		},
		showList:function(){
			$('#list').show();
			$('#layer').hide();
		}
	})
	//实例化路由
	var router = new Router();
	//开始路由
	return function(){
		Backbone.history.start();
	}
})