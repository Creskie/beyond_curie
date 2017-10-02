//Click card back to fade in/out full-screen div
$( "#back_1" ).click(function() {
	$("#cover_one").fadeIn( "slow", function() {
  });
  //Disable scroll when full-screen div
	$('body').addClass('stop-scrolling');
	$('body').bind('touchmove', function(e){e.preventDefault()});
});

$("#cover_one").click(function() {
  $("#cover_one").fadeOut( "slow", function() {
  $(".card").flip(false);	
  });
  //Enable scroll when exiting full-screen div
  	$('body').removeClass('stop-scrolling');
  	$('body').unbind('touchmove');
});

//Loading Screen
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

//Card flip when clicked
$(".card").flip();

//Disable flip once flipped
// $('.card').on('flip:done', function onFlipDone() {
// 	$(this).off('.flip');
// });

//Page position starts at top
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

//Side navigation bar fade while scrolling
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