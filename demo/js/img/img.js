define(['lib/backbone'],function(Backbone){
	var w = ($(window).width()-18)/2;
	var ImageModel = Backbone.Model.extend({
		initialize:function(){
			var h = w / this.attributes.width * this.attributes.height;
			this.attributes.drawWidth = w;
			this.attributes.drawHeight = h;
		}
	})
	return ImageModel;
})