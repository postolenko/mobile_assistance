$(window).on("load",function(){

	$(".scroll").mCustomScrollbar();

});

// $.fn.select2.amd.require([
//     'select2/selection/multiple',
//     'select2/selection/search',
//     'select2/dropdown',
//     'select2/dropdown/attachContainer',
//     'select2/dropdown/closeOnSelect',
//     'select2/utils'
// ], function (MultipleSelection, Search, Dropdown, AttachContainer, CloseOnSelect, Utils) {
//     var SelectionAdapter = Utils.Decorate(
//         MultipleSelection,
//         Search
//     );

    // var DropdownAdapter = Utils.Decorate(
    //     Utils.Decorate(
    //         Dropdown,
    //         CloseOnSelect
    //     ),
    //     AttachContainer
    // );
    // $('#calcSelect').select2({
    //     width: '100%',
    //     dropdownAdapter: DropdownAdapter
    // });
    // $('#calcSelect2').select2({
    //     width: '100%',
    //     dropdownAdapter: DropdownAdapter
    // });
// });

$(document).ready(function() {		

	$("select").each(function() {

		$(this).select2({
			width: "100%",
			minimumResultsForSearch: Infinity
		});

	});

	// $('#calcSelect2').select2({
 //        width: '100%',
 //        dropdownAdapter: DropdownAdapter
 //    });

	
	$(".table_slider").not(".slick-initialized").slick({
        dots: false,
        arrows: true,
        autoplay: false,
        // loop: false,
        // autoplaySpeed: 5000,
        speed: 400,
        // infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
	        {
	          breakpoint: 1124,
	          settings: {
	            slidesToShow: 2,
	            slidesToScroll: 1,
	          }
	        },
	        {
	          breakpoint: 680,
	          settings: {
	            slidesToShow: 2,
	            slidesToScroll: 1
	          }
	        },
	        {
	          breakpoint: 640,
	          settings: {
	            slidesToShow: 1,
	            slidesToScroll: 1
	          }
	        }
	      ]
	    });
	

	$(".slide-prev").click(function() {
		$(this).closest(".table_slider_wrapp").find(".table_slider .slick-prev").trigger('click');

	});

	$(".slide-next").click(function() {
		$(this).closest(".table_slider_wrapp").find(".table_slider .slick-next").trigger('click');
	});

});

