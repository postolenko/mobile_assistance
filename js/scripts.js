var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

$(window).load(function() {

    getSelectWidth();
    getSlidingBtnPosition();

});

$(window).resize(function() {

    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

    getSelectWidth();
    getSlidingBtnPosition();

});

$(document).ready(function() {

    $(".count-box button").click(function(e) {

        e.preventDefault();

        parentBlock = $(this).closest(".count-box");

        var countInput = parentBlock.find(".count-num input");

        var countVal = countInput.val();

        if(countVal == "") {

            countVal = 0;

        }

        if( $(this).hasClass("minus-btn") && countVal > 0 ) {

            countVal--;

        } else if( $(this).hasClass("plus-btn")) {

            countVal++;

        }

        countInput.val(countVal);

        var resetBtn = parentBlock.closest(".inline-blocks").find(".reset_btn");

        if(countVal > 0) {

            resetBtn.css({
                "display" : "block"
            });

        } else {

            resetBtn.css({
                "display" : "none"
            });

        }

    });

    $(".reset_btn").click(function(e) {

        e.preventDefault();

        parentBlock = $(this).closest(".inline-blocks");

        parentBlock.find(".count-num input").val(0);

        $(this).hide();

    });
   
    $( ".count-box input" ).keyup(function() {

        parentBlock = $(this).closest(".inline-blocks");
        var resetBtn = parentBlock.find(".reset_btn");
        
        if( $(this).val() == 0 ) {

            resetBtn.css({
                "display" : "none"
            });

        } else {

            resetBtn.css({
                "display" : "block"
            });

        }

    });

    $(".sliding_btn").each(function() {

        var slidingBtnIndex = $(this).attr("data-slidingbtn-index");
        parentBlock = $(this).closest(".sliding_table");
        var slidingBox = parentBlock.find(".sliding_box[data-slidingbox-index = '"+ slidingBtnIndex +"']");

        if( $(this).hasClass("active") ) {            

            slidingBox.css({
                "display" : "block"
            });

            $(this).addClass("active");
            $(this).closest(".sliding_box_title").addClass("active");

        } else {

            slidingBox.css({
                "display" : "none"
            });

            $(this).removeClass("active");
            $(this).closest(".sliding_box_title").removeClass("active");

        }

        // var rightCoord = $(this).closest(".sliding_table").offset().left + $(this).closest(".sliding_table").width() - $(this).width() / 2;

        // console.log(rightCoord);

        // $(this).offset({left: rightCoord});

    });

    $(".sliding_btn").click(function(e) {

        var slidingBtnIndex = $(this).attr("data-slidingbtn-index");
        parentBlock = $(this).closest(".sliding_table");
        var slidingBox = parentBlock.find(".sliding_box[data-slidingbox-index = '"+ slidingBtnIndex +"']");

        if( $(this).hasClass("active") ) {

            slidingBox.css({
                "display" : "none"
            });

            $(this).removeClass("active");
            $(this).closest(".sliding_box_title").removeClass("active");

        } else {

            slidingBox.css({
                "display" : "block"
            });

            $(this).addClass("active");
            $(this).closest(".sliding_box_title").addClass("active");

        }        

    });

    // var cellsRowCount = 0;

    var arrowsTempl;
    var slidingCell;

    arrowsIndex = 0;

    // $(".table_slider .slide:eq(0) .sliding_box").each(function() {

    //     parentBlock = $(this).closest(".sliding_table");

    //     slidingCell = $(this).find(".cell");

    //     slidingCell.each(function() {            

    //         arrowsIndex++;
    //         slidingCell.attr("data-cell-index", arrowsIndex);
    //         arrowsTempl = '<div class="slides_btns_wrapp" data-arrow-index = '+ arrowsIndex +'>'+
    //                         '<button type="button" class="slide-prev"></button>'+
    //                         '<button type="button" class="slide-next"></button>'+
    //                     '</div>';
    //         parentBlock.find(".arrows_wrapp").append(arrowsTempl);
    //     });

    // });

});


function getSelectWidth() {

    // $("select").each(function() {

    //     parentBlock = $(this).closest(".select_wrapp");

    //     parentBlock.find(".select2-container").css({
    //         "width" : parentBlock.width() + "px"
    //     });

    // });

}


function getSlidingBtnPosition() {

    $(".sliding_btn").each(function() {

        var rightCoord = $(this).closest(".sliding_table").offset().left + $(this).closest(".sliding_table").width() - $(this).width() / 2;

        console.log(rightCoord);

        $(this).offset({left: rightCoord});

    });

}

function getArrowsPosition() {

    // var $(".sliding_table").find(".arrows_wrapp");

}