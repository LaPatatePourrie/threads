define(["backbone","api","utils-form"],function(e,t,n){return["$scope","$routeParams","$timeout",function(e,r,i){function s(t){e.thread=Thread.findOrCreate({id:t}),e.thread.fetch({success:function(){e.$apply()}})}function o(){e.threads=new Threads,e.threads.fetch({success:function(){e.$apply()}})}r.id?s(r.id):o(),e.forms={message:(new n).init({order:["content"],data:{content:{label:"Votre message :",type:"textarea",valid:["notEmpty"]}}}),thread:(new n).init({order:["title","content"],data:{title:{label:"Titre :",type:"input",detail:"text",valid:["notEmpty"]},content:{label:"Votre message :",type:"textarea",valid:["notEmpty"]}}})},e.sorts=[{id:"id",label:"Id"},{id:"date",label:"Date"},{id:"title",label:"Title"},{id:"author",label:"Auteur"}],e.sort={field:e.sorts[0],desc:!1},e.postThread=function(){e.action="postingThread",e.forms.thread.reset(),e.forms.thread.callbacks.submit=function(){var n=e.forms.thread,r=new Thread(n.toJSON());r.url=t.url().threads,r.save("","",{success:function(r){e.action="",o();var i=n.toJSON();i.idThread=r.get("id");var s=new Message(i);s.url=t.url().postMessage,s.save("","",{success:function(t){console.log(t),t.set("author",Author.findOrCreate({id:t.get("idAuthor")})),e.threads.get(i.idThread).get("messages").add(t)}})},error:function(e){console.log(err)}})}},e.deleteThread=function(e){var t=Thread.findOrCreate({id:e});t.destroy()},e.postMessage=function(n){e.thread.set("status","postingMessage"),e.thread.get("messages").invoke("set",{status:""}),e.forms.message.reset(),e.forms.message.callbacks.submit=function(){var n=e.forms.message.toJSON();n.idThread=e.thread.get("id");var r=new Message(n);r.url=t.url().postMessage,r.save("","",{success:function(t){e.thread.set("status",""),s(e.thread.get("id"))},error:function(e){console.log(err)}})}},e.deleteMessage=function(n){e.thread.set("status","deleting");var r=e.thread.get("messages").get(n);r.url=t.url(n).updateMessage,r.destroy()},e.updateMessage=function(n,r){e.thread.set("status","");var i=e.thread.get("messages").get(n);e.forms.message=e.forms.message.hydrate({content:i.get("content")}),e.forms.message.callbacks={submit:function(){i.set("status","updated"),_(e.forms.message.toJSON()).map(function(e,t){i.set(t,e)}),i.url=t.url(i.get("id")).updateMessage,i.save({succes:function(e){console.log("Message updated")},error:function(e){console.log("Error updating message",e)}})}},e.thread.get("messages").invoke("set",{status:""}),i.set("status","updating")}}]});