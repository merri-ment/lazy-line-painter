/* 
* Lazy Line Painter 1.0
* SVG Stroke animation.
*
* https://github.com/camoconnell/lazy-line-painter
*
* Copyright 2013 
* Cam O'Connell - http://www.camoconnell.com  http://www.behance.net/camoconnell 
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*  
*/ 
(function(b){var g={init:function(a){return this.each(function(){var c=b(this);if(!c.data("lazyLinePainter")){var e=b.extend({strokeWidth:2,strokeColor:"#fff",strokeCap:"round",strokeJoin:"round",onComplete:null,delay:null},a),d=c.attr("id").replace("#",""),j=e.svgData[d].dimensions.width,k=e.svgData[d].dimensions.height,d=e.svgData[d].strokepath,c=new Raphael(c.attr("id"),j,k);b(this).data("lazyLinePainter",{settings:e,pathData:d,paper:c,count:1,complete:!1,playhead:0})}})},paint:function(){return this.each(function(){var a=
b(this).data("lazyLinePainter"),c=function(){b.each(a.pathData,function(c,d){var b=a.paper.path(d.path);b.attr({stroke:"none","stroke-width":a.settings.strokeWidth,"fill-opacity":0});setTimeout(function(){var c=a.paper,e=d.duration,g={stroke:a.settings.strokeColor,"fill-opacity":0,"stroke-width":a.settings.strokeWidth,"stroke-linecap":a.settings.strokeCap,"stroke-linejoin":a.settings.strokeJoin},h=function(){a.count++;if(a.pathData.length==a.count&&(a.complete=!0,null!=a.settings.onComplete))a.settings.onComplete()},
f;f="string"==typeof b?c.path(b).attr({stroke:"none",fill:"none"}):b;var l=c.path(f.getSubpath(0,1)).attr(g),m=f.getTotalLength(f);f.getPointAtLength(0);var n=(new Date).getTime(),p=setInterval(function(){var a=(new Date).getTime()-n,b=f.getSubpath(0,a/e*m);g.path=b;l.animate(g,25);a>=e&&(clearInterval(p),void 0!=h&&h(),f.remove())},25)},a.playhead);a.playhead+=d.duration})};a.settings.delay?setTimeout(c,a.settings.delay):c()})},erase:function(){return this.each(function(){var a=b(this);a.data("lazyLinePainter");
a.removeData("lazyLinePainter");a.remove()})}};b.fn.lazylinepainter=function(a){if(g[a])return g[a].apply(this,Array.prototype.slice.call(arguments,1));if("object"===typeof a||!a)return g.init.apply(this,arguments)}})(jQuery);