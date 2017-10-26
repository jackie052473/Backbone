define(['lib/backbone','lib/zepto','css!./list.css'],function(Backbone,$){
	var List = Backbone.View.extend({
		tpl:_.template('<a href="<%=href%>"><img src="<%=src%>" style="<%=style%>" alt="" /></a>'),
		leftHeight:0,
		rightHeight:0,
		events:{
			'tap .search span':'searchValue',
			'tap nav ul li':'searchType',
			'tap .go-top':'goTop'
		},
		initialize:function(){
			this.getDom();
			this.getData();
			this.listenTo(this.collection,'add',function(model,collection,options){
				this.render(model);
			})
			
			this.bindEvent();
		},
		bindEvent:function(){
			var me = this;
			var fn = _.throttle(function() {
				me.getData();
			}, 500)
			$(window).on('scroll', function() {
				if ($('body').height() < $(window).scrollTop() + $(window).height() + 200) {
					fn();
				}
				me.toggle();
			})
		},
		render:function(model){
			//获取数据
			//获取元素
			//定义模板
			//格式化模板
			var obj = {
				src:model.get('url'),
				href:'#/layer/'+model.get('id'),
				style:'width:'+model.get('drawWidth')+'px; '+'height:'+model.get('drawHeight')+'px'
			}
			var html = this.tpl(obj);
			//渲染视图
			if(this.leftHeight>=this.rightHeight){
				this.rightContainer.append(html);
				this.rightHeight += model.get('drawHeight')+6;
			}else{
				this.leftContainer.append(html);
				this.leftHeight += model.get('drawHeight')+6;
			}
		},
		getDom:function(){
			this.leftContainer = this.$('.left-container');
			this.rightContainer = this.$('.right-container');
		},
		getData:function(){
			this.collection.feachData();
		},
		//添加点击搜索事件
		searchValue:function(){
			//获取ipt内容
			var value = $('.search input').val();
			//校验合法性
			if(/^\s*$/.test(value)){return}			
			//过滤集合
			var me = this;
			var result = this.collection.filter(function(model,collction,option){
				return model.get('title').indexOf(value) >=0;
			})
			//清空视图
			this.clearView();
			//渲染数据
			_.forEach(result, function(model, index, arr) {
				me.render(model)
			})
			//清空输入框	
			$('.search input').val('');
		},
		clearView:function(){
			this.leftContainer.html('');
			this.rightContainer.html('');

			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		//添加分类事件
		searchType:function(e){
			var value = $(e.currentTarget).data('type');
			var result = this.collection.filter(function(model,collection,options){
				return model.get('type') === value;
			})
			this.clearView();			
			var me = this;
			_.forEach(result,function(model,index,models){
				me.render(model);
			})
		},
		//添加返回顶部事件
		toggle:function(){
			if($(window).scrollTop()>=500){
				$('.go-top').show();
			}else{
				$('.go-top').hide();
			}
		},
		goTop:function(){
			window.scrollTo(0, 0)
		}


	})
	return List;
})