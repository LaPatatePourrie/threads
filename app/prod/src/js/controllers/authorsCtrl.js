define(["backbone","api","utils-form"],function(e,t,n){return["$scope","$routeParams","$timeout",function(e,r,i){function s(n){e.author=Author.findOrCreate({id:n}),e.threads=new Threads,e.threads.url=t.url(n).threadsByAuthor,e.messages=new Messages,e.messages.url=t.url(n).messagesByAuthor,e.author.fetch({success:function(){e.$apply()}}),e.threads.fetch({success:function(){e.$apply()}}),e.messages.fetch({success:function(){e.$apply()}})}function o(){e.authors=new Authors,e.authors.fetch({success:function(){e.$apply()}})}r.id?s(r.id):o(),e.forms={author:(new n).init({order:["login","name","passwd"],data:{login:{label:"Login",type:"input",valid:["notEmpty"]},name:{label:"Name",type:"input",valid:["notEmpty"]},passwd:{label:"Password",type:"input",valid:["notEmpty"]}}})},e.sorts=[{id:"id",label:"Id"},{id:"name",label:"Nom"}],e.sort={field:e.sorts[0],desc:!1},e.postAuthor=function(){e.action="postingAuthor",e.forms.author.reset(),e.forms.author.callbacks.submit=function(){var n=new Author(e.forms.author.toJSON());n.url=t.url().authors,n.save("","",{success:function(t){e.action="",o()},error:function(e){console.log(e)}})}},e.deleteAuthor=function(e){var t=Author.findOrCreate({id:e});t.destroy()}}]});