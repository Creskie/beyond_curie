$('img.lazy').lazyload({ threshold: 1000 });

// Click card back to fade in/out full-screen div
$('.gallery_poster').click(function onCardClick() {
  var cardKey = $(this).parent().data('key');
  $('#cover_' + cardKey)
    .removeClass('cover-hidden')
    .addClass('cover-show')
    .one('transitionend webkitTransitionEnd oTransitionEnd', function onCoverFadeIn() {
      $('body').addClass('stop-scrolling');
    });
});
$('.cover').click(function onCoverClick() {
  $(this)
    .removeClass('cover-show')
    .addClass('cover-hidden')
    .off('transitionend webkitTransitionEnd oTransitionEnd');

  $('body').removeClass('stop-scrolling');
});

// Loading Screen
(function setupLoadingAnimation() {
	var shouldStop = false;

	function stopLoadingAnimation() {
		$('#container').css('display', 'block');
		$('#loading').fadeOut(400);
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

$(".side_number").click(function(event){
	event.preventDefault();
	var index = $(this).attr("href");

  var header = $('.poster_number')[index - 1];
  var poster = $('.gallery_poster')[index - 1];

  var scrollTop = $(header).offset().top + Math.floor(($(poster).height() - $(window).height()) / 2);

	$("html, body").animate({ scrollTop: scrollTop });
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
