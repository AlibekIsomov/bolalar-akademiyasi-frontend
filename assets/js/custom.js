(function ($) {
	
	"use strict";
	// Page loading animation
	$(window).on('load', function() {
		$('#js-preloader').addClass('loaded');
		setTimeout(function() {
			$('#js-preloader').fadeOut('slow', function() {
				$(this).remove();
				$('#main-content').fadeIn('slow'); // Show main content
			});
		}, 1000); // Adjust the delay for faster removal
	});

$(window).scroll(function() {
	var scroll = $(window).scrollTop();
	var box = $('.header-text').height();
	var header = $('header').height();

	if (scroll >= box - header) {
	  $("header").addClass("background-header");
	} else {
	  $("header").removeClass("background-header");
	}
  })
	var width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	const elem = document.querySelector('.event_box');
	const filtersElem = document.querySelector('.event_filter');
	if (elem) {
		const rdn_events_list = new Isotope(elem, {
			itemSelector: '.event_outer',
			layoutMode: 'masonry'
		});
		if (filtersElem) {
			filtersElem.addEventListener('click', function(event) {
				if (!matchesSelector(event.target, 'a')) {
					return;
				}
				const filterValue = event.target.getAttribute('data-filter');
				rdn_events_list.arrange({
					filter: filterValue
				});
				filtersElem.querySelector('.is_active').classList.remove('is_active');
				event.target.classList.add('is_active');
				event.preventDefault();
			});
		}
	}


	$('.owl-banner').owlCarousel({
		center: true,
      items:1,
      loop:true,
      nav: true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});

	$('.owl-testimonials').owlCarousel({
	  center: true,
      items:1,
      loop:true,
      nav: true,
	  navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>','<i class="fa fa-angle-right" aria-hidden="true"></i>'],
      margin:30,
      responsive:{
        992:{
            items:1
        },
		1200:{
			items:1
		}
      }
	});


	// Menu Dropdown Toggle
	$(".menu-trigger").on('click', function() {	
		$(this).toggleClass('active');
		$('.header-area .nav').slideToggle(300);
	});

	// Prevent menu from closing when clicking on links inside the menu
	document.querySelectorAll('.header-area .nav a').forEach(function(link) {
		link.addEventListener('click', function(event) {
			event.stopPropagation(); // Prevent click from bubbling up to the menu trigger
		});
	});
	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 767) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});



	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var refElement = $(currLink.attr("href"));
	        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	            $('.nav ul li a').removeClass("active");
	            currLink.addClass("active");
	        }
	        else{
	            currLink.removeClass("active");
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 1000);
		});
	});

	const dropdownOpener = $('.main-nav ul.nav .has-sub > a');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                var thisItemParent = _this.parent('li'),
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                if (thisItemParent.hasClass('has-sub')) {
                    var submenu = thisItemParent.find('> ul.sub-menu');

                    if (submenu.is(':visible')) {
                        submenu.slideUp(450, 'easeInOutQuad');
                        thisItemParent.removeClass('is-open-sub');
                    } else {
                        thisItemParent.addClass('is-open-sub');

                        if (thisItemParentSiblingsWithDrop.length === 0) {
                            thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        } else {
                            thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                                submenu.slideDown(250, 'easeInOutQuad');
                            });
                        }
                    }
                }

                e.preventDefault();
            });
        });
    }

})(window.jQuery);

document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('a').forEach(function(link) {
		link.addEventListener('click', function(event) {
			event.preventDefault();
			const url = new URL(link.href);
			history.pushState(null, '', url.origin + url.pathname);
			// Optionally, you can load content dynamically here
			console.log('URL updated to:', url.origin + url.pathname);
		});
	});
});

document.addEventListener('DOMContentLoaded', function() {
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 3,
		spaceBetween: 30,
		loop: true, // Enable looping
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {
			1024: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			640: {
				slidesPerView: 1,
				spaceBetween: 10,
			},
			320: {
				slidesPerView: 1,
				spaceBetween: 10,
			}
		}
	});
});



document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("registrationModal");
    const openModalButton = document.getElementById("openModalButton");
    const closeButton = document.querySelector(".close-button");

    // Function to open the modal
    function openModal() {
        modal.style.display = "block"; // Show modal first
        setTimeout(() => {
            modal.classList.add("show"); // Add the show class to trigger animation
        }, 10); // Small timeout to allow display to take effect
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove("show"); // Remove the show class to trigger fade-out
        setTimeout(() => {
            modal.style.display = "none"; // Hide the modal after the animation
        }, 300); // Match this duration with the CSS transition duration
    }

    // Event listeners
    openModalButton.onclick = function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        openModal();
    };

    closeButton.onclick = closeModal;

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

    // Open modal automatically after 15 seconds
    setTimeout(openModal, 15000); // 15 seconds (15000 milliseconds)
});

// Filials

document.addEventListener("DOMContentLoaded", function() {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1, // Number of slides to show
        spaceBetween: 10, // Space between slides
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2, // Show 2 slides on small screens
            },
            768: {
                slidesPerView: 3, // Show 3 slides on medium screens
            },
        },
    });
});