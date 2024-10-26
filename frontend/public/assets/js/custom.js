var $ = jQuery.noConflict();

$(document).ready(function () {
  jQuery('ul.sf-menu').superfish({
    animation: {
      height: 'show'
    },
    delay: 100
  });
  $("#toggle-btn").click(function () {
    $(".sf-menu").slideToggle("slow");
  });

  $('.toggle-subarrow').click(
    function () {
      $(this).parent().toggleClass("mob-drop");
    });

  var header = $(".header-inner");
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 20 && $(this).width() > 769) {
      header.addClass("navbar-fixed-top");
    } else {
      header.removeClass('navbar-fixed-top');
    }
  });
  $(this).find(".h4 i").each(function () {
    $(this).addClass("green");
  });
});

//niceselect
$(document).ready(function () {
  //$('select').niceSelect();
});

//banner
$(document).ready(function () {
  var loop = true;

  function addSiblingClass(event) {
    var index = event.item.index;
    var stage = event.relatedTarget.$stage;

    if (stage) {
      var items = stage.find('.owl-item');
      stage.find('.sibling').removeClass('sibling');
      stage.find('.mirror-active').removeClass('mirror-active');

      items.eq(index - 1).addClass('sibling');
      items.eq(index + 1).addClass('sibling');

      if (loop) {

        var mirrorActive = null;
        var clonedItems = Math.ceil(event.item.count / 2);
        clonedItems = (clonedItems < 2) ? 2 : clonedItems;

        if (index === (clonedItems - 1)) {
          mirrorActive = items.length - (clonedItems + 1);

        } else if (index === (items.length - (clonedItems + 1))) {
          mirrorActive = (clonedItems - 1);

        }

        if (mirrorActive) {
          items.eq(mirrorActive - 1).addClass('sibling');
          items.eq(mirrorActive).addClass('mirror-active');
          items.eq(mirrorActive + 1).addClass('sibling');
        }
      }
    }
  }


});

//tab service

// tabbed content
// http://www.entheosweb.com/tutorials/css/tabs.asp
$(".tab_content").hide();
$(".tab_content:first").show();

/* if in tab mode */
$("ul.tabs li").click(function () {

  $(".tab_content").hide();
  var activeTab = $(this).attr("rel");
  $("#" + activeTab).fadeIn();

  $("ul.tabs li").removeClass("active");
  $(this).addClass("active");

  $(".tab_drawer_heading").removeClass("d_active");
  $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass("d_active");

  /*$(".tabs").css("margin-top", function(){ 
     return ($(".tab_container").outerHeight() - $(".tabs").outerHeight() ) / 2;
  });*/
});
$(".tab_container").css("min-height", function () {
  return $(".tabs").outerHeight() + 30;
});
/* if in drawer mode */
$(".tab_drawer_heading").click(function () {

  $(".tab_content").hide();
  var d_activeTab = $(this).attr("rel");
  $("#" + d_activeTab).fadeIn();

  $(".tab_drawer_heading").removeClass("d_active");
  $(this).addClass("d_active");

  $("ul.tabs li").removeClass("active");
  $("ul.tabs li[rel^='" + d_activeTab + "']").addClass("active");
});


/* Extra class "tab_last" 
   to add border to bottom side
   of last tab 
$('ul.tabs li').last().addClass("tab_last");*/



//clint


$(document).ready(function () {
  if($('#testimonial-slider').length>0){
    $("#testimonial-slider").owlCarousel({
      items: 1,
      itemsDesktop: [1000, 2],
      itemsDesktopSmall: [990, 1],
      itemsTablet: [768, 1],
      loop: true,
      autoplay: true,
      //pagination:true,
      //navigation:true,
      //navigationText:["",""],
      //autoplayTimeout:1000,

      autoplayTimeout: 5000,
      autoplayHoverPause: true

    });
  }
    
});




//mouse cursor


const updateProperties = (elem, state) => {
  elem.style.setProperty('--x', `${state.x}px`)
  elem.style.setProperty('--y', `${state.y}px`)
  elem.style.setProperty('--width', `${state.width}px`)
  elem.style.setProperty('--height', `${state.height}px`)
  elem.style.setProperty('--radius', state.radius)
  elem.style.setProperty('--scale', state.scale)
}

document.querySelectorAll('.cursor').forEach(cursor => {
  let onElement

  const createState = e => {
    const defaultState = {
      x: e.clientX,
      y: e.clientY,
      width: 40,
      height: 40,
      radius: '50%'
    }

    const computedState = {}

    if (onElement != null) {
      const {
        top,
        left,
        width,
        height
      } = onElement.getBoundingClientRect()
      const radius = window.getComputedStyle(onElement).borderTopLeftRadius

      computedState.x = left + width / 2
      computedState.y = top + height / 2
      computedState.width = width
      computedState.height = height
      computedState.radius = radius
    }

    return {
      ...defaultState,
      ...computedState
    }
  }

  document.addEventListener('mousemove', e => {
    const state = createState(e)
    updateProperties(cursor, state)
  })

  document.querySelectorAll('a, button').forEach(elem => {
    elem.addEventListener('mouseenter', () => (onElement = elem))
    elem.addEventListener('mouseleave', () => (onElement = undefined))
  })
})


//slick banner

$(document).ready(function () {

  $(".Modern-Slider").slick({
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    dots: true,
    pauseOnDotsHover: true,
    cssEase: 'linear',
    fade: true,
    draggable: false,
    prevArrow: '<button class="PrevArrow"></button>',
    nextArrow: '<button class="NextArrow"></button>',
  });

})



$(function () {
  $(".btn").click(function () {
    $(".form-signin").toggleClass("form-signin-left");
    $(".form-signup").toggleClass("form-signup-left");
    $(".frame").toggleClass("frame-long");
    $(".signup-inactive").toggleClass("signup-active");
    $(".signin-active").toggleClass("signin-inactive");
    $(".forgot").toggleClass("forgot-left");
    $(this).removeClass("idle").addClass("active");
  });
});

$(function () {
  $(".btn-signup").click(function () {
    $(".nav").toggleClass("nav-up");
    $(".form-signup-left").toggleClass("form-signup-down");
    $(".success").toggleClass("success-left");
    $(".frame").toggleClass("frame-short");
  });
});

$(function () {
  $(".btn-signin").click(function () {
    $(".btn-animate").toggleClass("btn-animate-grow");
    $(".welcome").toggleClass("welcome-left");
    $(".cover-photo").toggleClass("cover-photo-down");
    $(".frame").toggleClass("frame-short");
    $(".profile-photo").toggleClass("profile-photo-down");
    $(".btn-goback").toggleClass("btn-goback-up");
    $(".forgot").toggleClass("forgot-fade");
  });
});


// PRELOADER

$(window).on("load", function () {

  $("#preloader").fadeOut(500);

});





//blood request js step form-signin

$(document).ready(function () {

  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".next").click(function () {

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function (now) {
        // for making fielset appear animation
        opacity = 1 - now;

        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        next_fs.css({
          'opacity': opacity
        });
      },
      duration: 500
    });
    setProgressBar(++current);
  });

  $(".previous").click(function () {

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate({
      opacity: 0
    }, {
      step: function (now) {
        // for making fielset appear animation
        opacity = 1 - now;

        current_fs.css({
          'display': 'none',
          'position': 'relative'
        });
        previous_fs.css({
          'opacity': opacity
        });
      },
      duration: 500
    });
    setProgressBar(--current);
  });

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
      .css("width", percent + "%")
  }

  $(".submit").click(function () {
    return false;
  })

  
});

//new step point active js
$(function(){
  $('.dieases.action-button').click(function(){
    setTimeout(() => {
      $(this).addClass('active');
    }, 1000);
  })
})



//otp javascript code

	$('#otp input').keyup(function(){
		$(this).val($(this).val().charAt($(this).val().length - 1))
		
		$(this).next().focus()		
	})