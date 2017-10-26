define(['lib/backbone','js/img/img'],function(Backbone,ImageModel){
	var ImageCollection = Backbone.Collection.extend({
		model:ImageModel,
		url:'data/imageList.json', 
		modelId:0,
		feachData:function(){
			var me = this;
			$.get(this.url,function(res){
				if(res && res.errno ===0){
					res.data.sort(function(){
						return Math.random() > 0.5 ? 1 : -1;
					})
					_.forEach(res.data,function(obj,index,models){
						obj.id = ++me.modelId;
					})
					me.add(res.data);
				}
			})

		}
	})
	return ImageCollection;
})