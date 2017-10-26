define(['lib/backbone','css!./layer.css'],function(Backbone){
	var height = $(window).height()-67;
	var Layer = Backbone.View.extend({
		tpl:_.template($('#tpl_layer').text()),
		events:{
			'tap .layer .image-container img': 'toggleHeader',
			'swipeLeft .layer .image-container img': 'showNextImage',
			'swipeRight .layer .image-container img': 'showPrevImage',
			'tap .layer .go-back': 'goBack',
			'tap .xxx':'goIndex',
			'tap .yyy':'goIndex'
		},
		goIndex:function(){
			Backbone.history.location.replace('');
		},
		goBack: function() {
			history.go(-1)
		},
		showPrevImage: function() {
			this.currentImageId--;
			var model = this.collection.get(this.currentImageId);
			if (model) {
				location.hash = '#/layer/' + this.currentImageId;
			} else {
				alert('已经是第一张了');
				this.currentImageId++;
			}
		},
		showNextImage: function() {
			this.currentImageId++;
			var model = this.collection.get(this.currentImageId);
			if (model) {
				location.hash = '#/layer/' + this.currentImageId;
			} else {
				alert('已经是最后一张了！')
				this.currentImageId--;
			}
		},

		toggleHeader: function() {
			this.$('.layer .header').toggle()
		},
		render:function(id){
			console.log(id)
			var model = this.collection.get(id);
			console.log(model)
			if(!model){
				Backbone.history.location.replace('');
				return;
			}
			this.currentImageId = model.get('id');
			var obj = {
				src:model.get('url'),
				style:'line-height:'+height+'px',
				title:model.get('title'),
				width:'385px'
			}
			var html = this.tpl(obj);
			var dom = this.$('#layer');
			dom.html(html);

		}
	})
	return Layer;
})