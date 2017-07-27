
/* Highlight */
$( document ).ready(function() {
    hljs.initHighlightingOnLoad();
    $('table').addClass('table table-striped table-hover');
});


$('body').scrollspy({
    target: '.bs-sidebar',
});


/* Prevent disabled links from causing a page reload */
$("li.disabled a").click(function() {
    event.preventDefault();
});

$(function() {
	new MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			let prevClassList = mutation.oldValue.split(" ");
			let target = $(mutation.target);
			let chevron = $("#nova-chevron-return");

			if (prevClassList.indexOf("collapse") >= 0) {
				chevron.addClass("expanded expanding");
			} else if (prevClassList.indexOf("in") >= 0 || (target.hasClass("collapsing") && !chevron.hasClass("expanding"))) {
				chevron.removeClass("expanded").addClass("collapsing");
			}

			if (target.hasClass("collapse")) {
				chevron.removeClass("collapsing");
			} else if (!target.hasClass("collapse") && !target.hasClass("collapsing")) {
				chevron.removeClass("expanding");
			}
		});
	}).observe($(".navbar-collapse").get(0), {attributes: true, attributeOldValue: true, attributeFilter: ["class"]});
});
