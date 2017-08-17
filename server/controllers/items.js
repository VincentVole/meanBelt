var mongoose = require('mongoose');
var User = mongoose.model('User');
var Item = mongoose.model('Item');

module.exports = {
	add: (req, res)=>{
		User.findOne({name: req.body.creatorName}, (err, cUser)=>{
			if(err){
				console.log(err);
			}
			else{
				var newItem = new Item({title: req.body.newItem.title, description: req.body.newItem.desc, creator: cUser.name});
				newItem._creator = cUser._id;
				newItem.save((err, savedItem)=>{
					if(err){
						console.log(err);
						var errObj = {};

						if(err.errors.title){
							errObj.title = err.errors.title.message;
						}
						if(err.errors.description){
							errObj.description = err.errors.description.message;
						}
						res.json(errObj);
					}
					else{
						cUser.items.push(savedItem);
						cUser.save(err=>{
							if(err){
								console.log(err);
							}
							else{
								User.findOne({name: req.body.newItem.tag}, (err, tUser)=>{
									if(err){
										console.log(err);
									}
									else{
										tUser.items.push(savedItem);
										tUser.save(err=>{
											if(err){
												console.log(err);
											}
											else{
												res.json(true);
											}
										})
									}
								})
							}
						})
					}
				})
			}
		})
	},

	toggle: (req, res)=>{
		console.log('toggle server')
		Item.findOne({_id: req.body.id}, (err, item)=>{
			if(err){
				console.log(err);
			}
			else{
				item.complete = !item.complete;
				item.save(err=>{
					if(err){
						console.log(err);
					}
					else{
						res.json(true);
					}
				})
			}
		})
	}

}