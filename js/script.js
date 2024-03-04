/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function($) {
	"use strict";

	$(".history-scroller").niceScroll({
		cursorwidth: "10px",
		background: "#0d1015",
		cursorborder: "0",
		cursorborderradius: "0",
		autohidemode: false,
		zindex: 5
	});

	// testimonial-slider
	$('.testimonials').slick({
		dots: true,
		infinite: true,
		speed: 300,
		arrows: false,
		adaptiveHeight: true,
		
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	
	animatedProgressBar();
	windowHieght();
	previewPannel();

	function animatedProgressBar () {
		$(".progress").each(function() {
			var skillValue = $(this).find(".skill-lavel").attr("data-skill-value");
			$(this).find(".bar").animate({
				width: skillValue
			}, 1500);

			$(this).find(".skill-lavel").text(skillValue);
		});
	}

	function windowHieght(){
		if ( $(window).height() <=768 ) {
			$(".pt-table").addClass("desktop-768");
		} else {
			$(".pt-table").removeClass("desktop-768");
		}
	}

	/*----------------------------------------
		Isotope Masonry
	------------------------------------------*/
	function isotopeMasonry() {
		$(".isotope-gutter").isotope({
			itemSelector: '[class^="col-"]',
			percentPosition: true
		});
		$(".isotope-no-gutter").isotope({
			itemSelector: '[class^="col-"]',
			percentPosition: true,
			masonry: {
				columnWidth: 1
			}
		});

		$(".filter a").on("click", function(){
			$(".filter a").removeClass("active");
			$(this).addClass("active");
			var selector = $(this).attr("data-filter");
			$(".isotope-gutter").isotope({
					filter: selector,
					animationOptions: {
					duration: 750,
					easing: "linear",
					queue: false
				}
			});
			return false;
		});
	}

	/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
		Preview Pannel
	-=-=-=-=-=-=-=-=-=--=-=-=-=-=-*/
	function previewPannel() {
		$(".switcher-trigger").on("click", function() {
			$(".preview-wrapper").toggleClass("extend");
			return false;
		});
		if ($(window).width() < 768 ) {            
			//$(".preview-wrapper").removeClass("extend");
		}
		$(".color-options li").on("click", function(){			
			$("#color-changer").attr({
				"href":"css/colors/"+$(this).attr("data-color")+".css"
			});
			return false;
		});
	}
	
	$(window).on("load", function() {
		isotopeMasonry();

		$(".preloader").addClass("active");
		setTimeout(function () {
			$(".preloader").addClass("done");
		}, 1000);
	});

	class ClickSpark extends HTMLElement {
		constructor() {
		  super();
		  this.attachShadow({ mode: "open" });
		  this.root = document.documentElement;
		  this.svg;
		}
	  
		get activeEls() {
		  return this.getAttribute("active-on");
		}
	  
		connectedCallback() {
		  this.setupSpark();
	  
		  this.root.addEventListener("click", (e) => {
			if (this.activeEls && !e.target.matches(this.activeEls)) return;
	  
			this.setSparkPosition(e);
			this.animateSpark();
		  });
		}
	  
		animateSpark() {
		  let sparks = [...this.svg.children];
		  let size = parseInt(sparks[0].getAttribute("y1"));
		  let offset = size / 2 + "px";
	  
		  let keyframes = (i) => {
			let deg = `calc(${i} * (360deg / ${sparks.length}))`;
	  
			return [
			  {
				strokeDashoffset: size * 3,
				transform: `rotate(${deg}) translateY(${offset})`
			  },
			  {
				strokeDashoffset: size,
				transform: `rotate(${deg}) translateY(0)`
			  }
			];
		  };
	  
		  let options = {
			duration: 660,
			easing: "cubic-bezier(0.25, 1, 0.5, 1)",
			fill: "forwards"
		  };
	  
		  sparks.forEach((spark, i) => spark.animate(keyframes(i), options));
		}
	  
		setSparkPosition(e) {
		  let rect = this.root.getBoundingClientRect();
	  
		  this.svg.style.left =
			e.clientX - rect.left - this.svg.clientWidth / 2 + "px";
		  this.svg.style.top =
			e.clientY - rect.top - this.svg.clientHeight / 2 + "px";
		}
	  
		setupSpark() {
		  let template = `
			<style>
			  :host {
				display: contents;
			  }
			  
			  svg {
				pointer-events: none;
				position: absolute;
				rotate: -20deg;
				stroke: var(--click-spark-color, currentcolor);
				z-index:99;
			  }
	  
			  line {
				stroke-dasharray: 30;
				stroke-dashoffset: 30;
				transform-origin: center;
			  }
			</style>
			<svg width="30" height="30" viewBox="0 0 100 100" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
			  ${Array.from(
				{ length: 8 },
				(_) => `<line x1="50" y1="30" x2="50" y2="4"/>`
			  ).join("")}
			</svg>
		  `;
	  
		  this.shadowRoot.innerHTML = template;
		  this.svg = this.shadowRoot.querySelector("svg");
		}
	  }
	  
	  customElements.define("click-spark", ClickSpark);
	  
	  /** Demo scripts **/
	  
	  const spark = document.querySelector("click-spark");
	  const colorPicker = document.getElementById("click-spark-color");
	  
	  colorPicker.addEventListener("change", (e) => {
		spark.style.setProperty("--click-spark-color", e.target.value);
	  });
	  
})(jQuery);