//>>built
define(["dojo/_base/declare","dojo/_base/lang","dojo/has"],function(c,f,d){d.add("dom-qsa",!!document.createElement("div").querySelectorAll);return c("dojox.mvc._InlineTemplateMixin",null,{buildRendering:function(){var a=this.srcNodeRef;if(a){for(var a=d("dom-qsa")?a.querySelectorAll("script[type\x3d'dojox/mvc/InlineTemplate']"):a.getElementsByTagName("script"),e=[],b=0,c=a.length;b<c;++b)(d("dom-qsa")||"dojox/mvc/InlineTemplate"==a[b].getAttribute("type"))&&e.push(a[b].innerHTML);if(a=f.trim(e.join("")))this.templateString=
a}this.inherited(arguments)}})});