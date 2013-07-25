define(['backbone', 'api'], function(Backbone, api) {

	// Models
	
	var User = Backbone.RelationalModel.extend({
		initialize: function () {
			this.set('fullname', this.get('firstname')+' '+this.get('lastname') ) 
		},
		signin: function (callbacks) {
			$.ajax({
			  type: 'POST',
			  url: api.url().signin,
			  data: this.toJSON(),
			  success: callbacks.success,
			  error: callbacks.error
			})
		},
		url: function () { return api.url(this.id).user }
	})

	var Message = Backbone.RelationalModel.extend({
		relations: [{
			type: Backbone.HasOne,
			key: 'author',
			relatedModel: User
		}]
	})
	
	var Thread = Backbone.RelationalModel.extend({
		relations: [
			{
				type: Backbone.HasMany,
				key: 'messages',
				relatedModel: Message,
				reverseRelation: {
					key: 'thread'
				}
			},
			{
				type: Backbone.HasOne,
				key: 'author',
				relatedModel: User
			},
			{
				type: Backbone.HasOne,
				key: 'lastAuthor',
				relatedModel: User
			}
		],
		url: function () { return api.url(this.id).thread }
	})


	// Collections

	var Threads = Backbone.Collection.extend({
		model: Thread,
		url: function () { return api.url().threads },
		sort_key: 'id'
	})

	var Users = Backbone.Collection.extend({
		model: User,
		url: function () { return api.url().users },
		sort_key: 'id'
	})

	var Messages = Backbone.Collection.extend({
		model: Message
	})


	Backbone.Collection.prototype.comparator = function(item) { return item.get(this.sort_key); }
	Backbone.Collection.prototype.sortByField = function(fieldName, desc) {
    this.comparator = function(item) { return item.get(this.sort_key); }
    if (desc) {
    	this.comparator = function(item) { return -item.get(this.sort_key); }
    }
    this.sort_key = fieldName;
    this.sort();
  }


	// Global Models
	window.Message = Message
	window.Thread = Thread
	window.User = User

	// Global Collections
	window.Messages = Messages
	window.Threads = Threads
	window.Users = Users


	return;
});