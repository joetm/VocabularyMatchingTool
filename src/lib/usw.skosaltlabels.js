/*
===============================================================================
Creator	: Ceri Binding, University of South Wales ceri.binding@southwales.ac.uk
Project	: ARIADNE
Classes	: usw.skosaltlabels
Summary	: List of alternate labels for a concept
Require	: jquery, jquery-ui, usw.aatlist.js
Example	: <div class="usw-skosaltlabels"/>
License	: http://creativecommons.org/publicdomain/zero/1.0/
===============================================================================
History :
13/02/2015 CFB Initially created script
27/04/2015 CFB Code refactored to reduce duplication
===============================================================================
*/
(function ($) { // start of main jquery closure    
	"use strict"; // strict	mode pragma	
	
	//$.widget("usw.skosaltlabels", $.usw.skosfile, {	
	$.widget("usw.skosaltlabels", $.usw.skoslist, {	// start of widget code 
		
	    // default options
	    options: {
	        conceptURI: "http://purl.org/heritagedata/schemes/agl_et/concepts/145131" // for example	       
	    },

	    getSPARQL: function () {
	        var self = this;

	        //	build a sparql query to get the data
	        var limit = parseInt(self.options.limit, 10);
	        var offset = parseInt(self.options.offset, 10);
	        var language = $.trim(self.options.language);

	        var sparql = "PREFIX skos: <http://www.w3.org/2004/02/skos/core#>"
               + " SELECT DISTINCT ?label WHERE {"
               + " <" + self.options.conceptURI + "> skos:altLabel ?label ."
               + (language !== "" ? " FILTER(langMatches(lang(?label),'" + language + "') || lang(?label)='')" : "")
	           + " }"
               + " ORDER BY ASC(str(?label))"
	           + (offset > 0 ? " OFFSET " + offset : "")
               + (limit > 0 ? " LIMIT " + limit : "");

	        return sparql;

	    }    

	});	// end of widget code

	// elements of class usw-skosaltlabels become a widget
	$(window).load(function () {
	    $(".usw-skosaltlabels").skosaltlabels(); 
	});

})(jQuery);	//end of main jquery closure
