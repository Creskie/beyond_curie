$('img.lazy').lazyload({ threshold: 1000 });

// Click card back to fade in/out full-screen div
$('.card').click(function onCardClick() {
  var cardKey = $(this).data('key');
  $('#cover_' + cardKey)
    .removeClass('cover-hidden')
    .addClass('cover-show')
    .one('transitionend webkitTransitionEnd oTransitionEnd', function onCoverFadeIn() {
      $('body').addClass('stop-scrolling');
    });

  $('body').on('touchmove', function (e) { e.preventDefault(); });
});
$('.cover').click(function onCoverClick() {
  $(this)
    .removeClass('cover-show')
    .addClass('cover-hidden')
    .off('transitionend webkitTransitionEnd oTransitionEnd');

  $('body')
    .removeClass('stop-scrolling')
    .off('touchmove');
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
  var divPos = $(header).offset().top;
	$("html, body").animate({scrollTop: divPos});
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
