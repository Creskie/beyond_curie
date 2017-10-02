//LOADING SCREEN
function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 3000);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('container', true);
	$('#loading').fadeOut("slow");
});

//CARD FLIP WHEN CLICKED
$(".card").flip();

//FILLS ENTIRE SCREEN WHEN CARD IS FLIPPED
$('.card').on('flip:done', function onFlipDone() {
	// $(this).off('.flip');

});

//NO IDEA WHAT IM DOING
$(window).on("click", ".back", function() {
    me = this;
    setTimeout( function() { $(me).removeClass("card back").addClass("big"); }, 1 );
});

$(window).on("click", ".big", function() {
    me = this;
    setTimeout( function() { $(me).removeClass("big").addClass("card back"); }, 1 );
});

//PAGE POSITION STARTS AT TOP
if ('scrollRestoration' in history) {
	history.scrollRestoration = 'manual';
}

$(document).ready(function onReady() {
	$('html,body').scrollTop(0);
});

$("li a").click(function(event){
	event.preventDefault();
	var id = $(this).attr("href");
	var divPosition = $(id).offset().top;
	$("html, body").animate({scrollTop: divPosition});
});

//SIDE NAVIGATION BAR FADE WHILE SCROLLING
(function setupSidebar() {
	var lastTimeoutHandle = null;
	var shouldFadeOut = true;

	function fadeSidebarOut() {
		$('#mobile_nav').fadeOut();
	}

	function fadeSidebarIn() {
		$('#mobile_nav').fadeIn();
		shouldFadeOut = true;
	}

	$(window).scroll(function onScroll() {
		if (shouldFadeOut) {
			shouldFadeOut = false;
			requestAnimationFrame(fadeSidebarOut);
		}

		if (lastTimeoutHandle) {
			clearTimeout(lastTimeoutHandle);
		}
		lastTimeoutHandle = setTimeout(fadeSidebarIn, 300);
	});
})();