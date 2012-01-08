/* Author: Scott Cormier

*/
function getTagline(thisId) {
	var txt = [
		"an interface designer",
		"a user experience designer",
		"an interaction designer",
		"a user researcher",
		"a usability analyist"];
	if (!thisId) {
		thisId = 0;
	}
	return txt[thisId];
}
function updateTagLine(startId) {
	var tagLine = $("#tagline");
	var tagLine2 = $("#tagline2");

	if (!startId) {
		startId = 0;
	}
	var tag = getTagline(startId);
	$(tagLine).html(tag);
	$(tagLine2).html(tag);
	updateHeaderSize();
	
	if (startId < 8) {
		window.setTimeout("updateTagLine("+ startId + 1 +")", 10000);
	}
	else {
		window.setTimeout("updateTagLine(0)", 10000);
	}

}
function updateVidSize() {
	var vidWidth = $("#main .vid:eq(0)").width();
	var vidHeight= $("#main .vid:eq(0)").height();
	var defaultW = 500;
	var wRatio	 = vidWidth/defaultW;

	$("#main .vid").each(function(){
		var vid = $("iframe", this);
		if (vid.length > 0) {
			var curH	= vid.height();
			var curW = vid.width();
			var newH	= Math.floor(curH * wRatio);
			if (vidWidth !== curW && (vidWidth > curW || vidWidth < curW)) {
				vid.height(newH).width(vidWidth);
			}
		}
		else {
			var obj	= $("object", this);
			var emb	= $("embed", obj);
			var ifr	= $("iframe", obj);
			var curHa= obj.attr("height");
			var curH	= obj.height();
			var curW = obj.width();
			var newH	= Math.floor(curH * wRatio);
			if(vidWidth !== curW && (vidWidth > curW || vidWidth < curW)) {
				obj.attr("width", vidWidth).attr("height", newH);
				if (emb) {
					emb.attr("width", vidWidth).attr("height", newH);
				}
				else {
					ifr.width(vidWidth).height(newH);
				}
			}
		}
	});
}
function updateHeaderSize() {
	var mHead	= $("#masthead");
	var mHeadTx	= $("#masthead h1");
	var headerW = $(mHead).width();
	var headerH = $(mHeadTx).outerHeight(true);
	var textW	= $(mHead).find(".title").width();
	var diffW	= headerW/textW;
	
	$(mHeadTx).css("fontSize", "197%");
	
	var curSize	= $(mHeadTx).css("fontSize").replace("px","");
	$(mHeadTx).css("font-size", Math.floor(curSize * diffW));
}

$(document).ready(function() {
	/* Fancybox Trigger */
	$('.lightbox').fancybox();

	$("a.group").live('click', function(){
		$(this).fancybox({
			'transitionIn'  :   'elastic',
			'transitionOut' :   'elastic',
			'speedIn'       :   600, 
			'speedOut'      :   200, 
			'overlayShow'   :   false
		});
	});

	/* HTML Photoset */
	$('.html_photoset').killPhotoset({photoSize: 1280});

	updateTagLine();
	updateVidSize();
	updateHeaderSize();
	$(window).bind("resize", updateVidSize);
	$(window).bind("resize", updateHeaderSize);
});


/**********************************************************************************************
**  jQuery Kill Photoset v1.0 (for Tumblr themes)
**  This gets rid of the flash slideshow Tumblr forces photo posts with multiple images to use.
**  
**  Copyright © 2010 Chris Kalani
**  MIT License - http://www.opensource.org/licenses/mit-license.php
**  Project URL: http://chriskalani.com/killphotoset
**********************************************************************************************/
;(function($){

    var defaults = {
        photoSize: 1280
    };
    
    $.fn.killPhotoset = function(options){ 
    
        var o =  $.extend(defaults, options);
        
        return this.each(function(){
        
            var $this = $(this);
            
            $this.empty();
            
            var set = $this.attr("id");
            var id = set.split("_")[1];
            
            $.getJSON("/api/read/json?id="+id+"&callback=?", function(boom){
                var pix = boom["posts"][0]["photos"];
                $.each(pix, function(){
                    var img = this["photo-url-"+o.photoSize];
                    $this.append('<div><a class="group" href="'+ img +'" rel="set-'+set+'"><img src="'+img+'" /></a></div>');
                });         
            });
        });
    };
})(jQuery);
