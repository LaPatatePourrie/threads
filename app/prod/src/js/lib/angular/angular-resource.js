/**
 * @license AngularJS v1.0.7
 * (c) 2010-2012 Google, Inc. http://angularjs.org
 * License: MIT
 */

(function(e,t,n){t.module("ngResource",["ng"]).factory("$resource",["$http","$parse",function(e,r){function c(e){return h(e,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function h(e,t){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,t?"%20":"+")}function p(e,t){this.template=e+="#",this.defaults=t||{};var n=this.urlParams={};o(e.split(/\W/),function(t){t&&(new RegExp("(^|[^\\\\]):"+t+"\\W")).test(e)&&(n[t]=!0)}),this.template=e.replace(/\\:/g,":")}function d(r,c,h){function m(e,t){var n={};return t=u({},c,t),o(t,function(t,r){n[r]=t.charAt&&t.charAt(0)=="@"?l(e,t.substr(1)):t}),n}function g(e){a(e||{},this)}var v=new p(r);return h=u({},i,h),o(h,function(r,i){r.method=t.uppercase(r.method);var l=r.method=="POST"||r.method=="PUT"||r.method=="PATCH";g[i]=function(t,n,i,c){var h={},p,d=s,y=null;switch(arguments.length){case 4:y=c,d=i;case 3:case 2:if(!f(n)){h=t,p=n,d=i;break}if(f(t)){d=t,y=n;break}d=n,y=i;case 1:f(t)?d=t:l?p=t:h=t;break;case 0:break;default:throw"Expected between 0-4 arguments [params, data, success, error], got "+arguments.length+" arguments."}var b=this instanceof g?this:r.isArray?[]:new g(p);return e({method:r.method,url:v.url(u({},m(p,r.params||{}),h)),data:p}).then(function(e){var t=e.data;t&&(r.isArray?(b.length=0,o(t,function(e){b.push(new g(e))})):a(t,b)),(d||s)(b,e.headers)},y),b},g.prototype["$"+i]=function(e,t,r){var o=m(this),u=s,a;switch(arguments.length){case 3:o=e,u=t,a=r;break;case 2:case 1:f(e)?(u=e,a=t):(o=e,u=t||s);case 0:break;default:throw"Expected between 1-3 arguments [params, success, error], got "+arguments.length+" arguments."}var c=l?this:n;g[i].call(this,o,c,u,a)}}),g.bind=function(e){return d(r,u({},c,e),h)},g}var i={get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}},s=t.noop,o=t.forEach,u=t.extend,a=t.copy,f=t.isFunction,l=function(e,t){return r(t)(e)};return p.prototype={url:function(e){var n=this,r=this.template,i,s;e=e||{},o(this.urlParams,function(o,u){i=e.hasOwnProperty(u)?e[u]:n.defaults[u],t.isDefined(i)&&i!==null?(s=c(i),r=r.replace(new RegExp(":"+u+"(\\W)","g"),s+"$1")):r=r.replace(new RegExp("(/?):"+u+"(\\W)","g"),function(e,t,n){return n.charAt(0)=="/"?n:t+n})}),r=r.replace(/\/?#$/,"");var u=[];return o(e,function(e,t){n.urlParams[t]||u.push(h(t)+"="+h(e))}),u.sort(),r=r.replace(/\/*$/,""),r+(u.length?"?"+u.join("&"):"")}},d}])})(window,window.angular);