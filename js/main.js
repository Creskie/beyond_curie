// Click card back to fade in/out full-screen div
$('.card').click(function onCardClick() {
  var cardKey = $(this).data('key');
  var coverSelector = "#cover_" + cardKey;
  $(coverSelector).fadeIn('slow');

  var body = $('body');
  body.addClass('stop-scrolling');
  body.on('touchmove', function (e) { e.preventDefault(); });
});
$('.cover').click(function onCoverClick() {
  $(this).fadeOut('slow');

  var body = $('body');
  body.removeClass('stop-scrolling');
  body.off('touchmove');
});

// Loading Screen
(function setupLoadingAnimation() {
	var shouldStop = false;

	function stopLoadingAnimation() {
		$('#container').css('display', 'block');
		$('#loading').fadeOut("slow");
	};

	function detectRace() {
		if (shouldStop) {
			stopLoadingAnimation();
		}
		shouldStop = true;
	};

	window.setTimeout(detectRace, 2000);
	$(document).ready(detectRace);
})();

// Page position starts at top
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

// Side navigation bar fade while scrolling
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
