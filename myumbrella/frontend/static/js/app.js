(function($, document){
	
	$(document).ready(function(){

		function jqueryManageClick() {
			// Cloning main navigation for mobile menu
			$(".mobile-navigation").empty().append($(".main-navigation .menu").clone());

			$(".mobile-navigation .logged-logout").click(function(e){
				e.preventDefault();
				window.location.href="/logout";
			});
		}

		jqueryManageClick();

		// Mobile menu toggle 
		$(".menu-toggle").click(function(){
			jqueryManageClick();
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});

})(jQuery, document);