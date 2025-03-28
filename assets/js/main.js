
!(function ($) {
  "use strict";

// jQuery Initial All Section Content Appear:
  AOS.init({
    duration: 1000,
    easing: "ease-in-out-back"
  });
  })(jQuery);

//  jQuery Numarical Numbers Animate Counter: 
$('[data-toggle="counter-up"]').counterUp({
  delay: 10,
  time: 1000
});

// Animated Typed Texts on Hero Background:
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

// Vertical Smooth Scroll Navigation Menu:
$(document).on('click', '.nav-menu a, .scrollto', function (e) {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    e.preventDefault();
    var target = $(this.hash);
    if (target.length) {
      var scrollto = target.offset().top;

      $('html, body').animate({
        scrollTop: scrollto
      }, 1500, 'easeInOutExpo');

      if ($(this).parents('.nav-menu, .mobile-nav').length) {
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');
      }

      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
      return false;
    }
  }
});

// Mobile Navigation Link Selected Function:
  $(document).on('click', '.mobile-nav-toggle', function (e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i');
  });

// Mob Navigation Menu Toggle Active Links:
  $(document).click(function (e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i');
      }
    }
  });

// Navigation Active State Cursor on Scroll:
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');
  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop() + 10;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('#menu-line-icon').removeClass('change');
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 200) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

// Button Scroll To Start Point:
$(document).ready(function () {
  $('.back-to-top').hide(); 

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });
});

// First Time Animated Progressive Bar:
  $('.skills-content').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

// On Click Hamburger Lines Turn Cross:
  function myFunction(x) {
    x.classList.toggle("change");
  }

// Portfolio Section Choose Filter Tab:
$(window).on('load', function () {
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows',
    filter: '.case-study'
  });

  $('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({
      filter: $(this).attr('data-filter')
    });
  });
});

// Popup Button Open Overlay Preview:
document.querySelectorAll('.popup-trigger').forEach(button => {
  button.addEventListener('click', () => {
    const portfolioItem = button.closest('.portfolio-item');
    const overlay = portfolioItem.querySelector('.overlay').cloneNode(true);
    const pdfSrc = portfolioItem.querySelector('iframe').src;
    overlay.querySelector('iframe').src = pdfSrc;
    document.body.appendChild(overlay);
    overlay.style.display = 'flex';
    overlay.style.zIndex = '9999';
    document.body.classList.add('no-scroll');
    overlay.classList.add('overlay-active'); 

// Active Overlay & Hide Scroll Up:
    $('.back-to-top').hide();

// Disable Background Scrolling Overlay:
    overlay.querySelector('.close-btn').addEventListener('click', () => {
      overlay.style.display = 'none';
      document.body.removeChild(overlay);
      document.body.classList.remove('no-scroll');
      overlay.classList.remove('overlay-active'); 

// Inactive Overlay & Show Scroll Up:
      $('.back-to-top').show();
    });
  });
});

// Button Scroll To Start Point:
$(window).scroll(function () {
  if ($(this).scrollTop() > 100 && !$('.overlay-active').length) { 
    $('.back-to-top').fadeIn('slow');
  } else {
    $('.back-to-top').fadeOut('slow');
  }
});

// Button Scroll To Start Point:
$('.back-to-top').click(function () {
  if (!$('.overlay-active').length) {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  }
});

// Partial Side Navtion Open & Close:
const resizeBtn = document.querySelector("[data-resize-btn]");
resizeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.body.classList.toggle("sb-expanded");
});


// Sliding Effect For Moving Active Tab:
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('#portfolio-flters li');
  const indicator = document.createElement('div');
  indicator.classList.add('indicator');
  document.querySelector('#portfolio-flters').appendChild(indicator);

  function updateIndicator(element) {
    const rect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.left = `${rect.left - parentRect.left}px`;
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', event => {
      document.querySelector('#portfolio-flters .filter-active').classList.remove('filter-active');
      event.target.classList.add('filter-active');
      updateIndicator(event.target);
    });
  });

  // Initialize the indicator position:
  updateIndicator(document.querySelector('#portfolio-flters .filter-active'));
});