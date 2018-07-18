var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

// ------------------

var heightsArr = [];
var heightElems;
var heightCells;
var cellHeight;
var totalHeight;

// ------------------

$(window).load(function() {

    // getSelectWidth();
    getSlidingBtnPosition();
    getCellsHeight();
    getArrowsPosition();

});

$(window).resize(function() {

    bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

    // getSelectWidth();
    getSlidingBtnPosition();
    getArrowsPosition();  
    getCellsHeight();
    getRightBorderParams();

    $(".titles-side .sliding_box_title").each(function() {

        parentBlock = $(".sliding_table");

        $(this).outerWidth(parentBlock.width());

    });

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

    $(".sliding_box_title").each(function() {

        var slidingBtnIndex = $(this).attr("data-slidingbtn-index");
        parentBlock = $(this).closest(".sliding_table");
        var slidingBox = parentBlock.find(".sliding_box[data-slidingbox-index = '"+ slidingBtnIndex +"']");

        if( $(this).hasClass("active") ) {            

            slidingBox.css({
                "display" : "block"
            });

            // $(this).addClass("active");
            // $(this).closest(".sliding_box_title").addClass("active");

            $(this).addClass("active");
            $(this).find(".sliding_btn").addClass("active");

        } else {

            slidingBox.css({
                "display" : "none"
            });

            // $(this).removeClass("active");
            // $(this).closest(".sliding_box_title").removeClass("active");

            $(this).removeClass("active");
            $(this).find(".sliding_btn").removeClass("active");

        }

    });

    // $(".sliding_box_title").click(function() {

    //     $(this).find(".sliding_btn").trigger('click');

    // });

    $(".titles-side .sliding_box_title").click(function(e) {

        var slidingBtnIndex = $(this).attr("data-slidingbtn-index");
        parentBlock = $(this).closest(".sliding_table");
        var slidingBox = parentBlock.find(".sliding_box[data-slidingbox-index = '"+ slidingBtnIndex +"']");
        slidingCell = slidingBox.find(".cell");

        if( $(this).hasClass("active") ) {     

            // $(this).removeClass("active");
            $(this).removeClass("active");
            $(this).find(".sliding_btn").removeClass("active");

            slidingCell.each( function() {

                indexAttr = $(this).attr("data-cell-index");
                $(this).closest(".table_slider_wrapp").find(".slides_btns_wrapp[data-arrow-index = '"+ indexAttr +"']").css({
                    "display" : "none"
                });

            });

            slidingBox.css({
                "display" : "none"
            });

        } else {

            slidingBox.css({
                "display" : "block"
            });

            $(this).addClass("active");
            $(this).find(".sliding_btn").addClass("active");
            // $(this).closest(".sliding_box_title").addClass("active");

            slidingCell.each( function() {

                indexAttr = $(this).attr("data-cell-index");
                $(this).closest(".table_slider_wrapp").find(".slides_btns_wrapp[data-arrow-index = '"+ indexAttr +"']").css({
                    "display" : "block"
                });

            });

            getArrowsPosition();

        }

        getRightBorderParams();

        $(".titles-side .sliding_box_title").each(function() {
            parentBlock = $(".sliding_table");
            $(this).outerWidth(parentBlock.width());
        });

    });

    var arrowsTempl;
    var slidingCell;

    arrowsIndex = 0;
    var indexCell;

    $(".sliding_table").each(function() {

        parentBlock = $(this);

        var tableSlider = $(this).find(".table_slider");

        slidingBox = tableSlider.find(".slide:eq(0) .sliding_box");

        slidingBox.each(function() {

            $(this).find(".cell").each(function() {

                arrowsIndex++;

                var indexCell = $(this).attr("data-heightel-index");

                var slideCell = $(this).closest(".table_slider").find(".slide .cell[data-heightel-index = '"+ indexCell +"']");

                slideCell.attr("data-cell-index", arrowsIndex);

                arrowsTempl = '<div class="slides_btns_wrapp" data-arrow-index = '+ arrowsIndex +'>'+
                                '<button type="button" class="slide-prev"></button>'+
                                '<button type="button" class="slide-next"></button>'+
                              '</div>';

                parentBlock.find(".arrows_wrapp").append(arrowsTempl);

            });

        });

    });

    var slidingArrows;
    var topCoord;

    $( ".table_slider .sliding_box .cell" ).bind({
      mouseenter: function() {

        parentBlock = $(".sliding_table");
        topCoord = $(this).offset().top;        
        indexAttr = $(this).attr("data-cell-index");
        slidingArrows = parentBlock.find(".slides_btns_wrapp[data-arrow-index='"+ indexAttr +"']");
        if( slidingArrows.offset().top >= topCoord &&
            slidingArrows.offset().top + $(this).height() <= topCoord + $(this).height()) {
            slidingArrows.css({
                "opacity" : "1"
            });
        }        
      },
      mouseleave: function() {
        slidingArrows.css({
            "opacity" : "0"
        });
      }
    });

    $( ".slides_btns_wrapp button" ).bind({
      mouseenter: function() {
        parentBlock = $(this).closest(".slides_btns_wrapp");
        parentBlock.css({
            "opacity" : "1"
        });
      },
      mouseleave: function() {
        parentBlock.css({
            "opacity" : "0"
        });           
      }
    });


    $(".titles-side .sliding_box_title").each(function() {
        parentBlock = $(".sliding_table");
        $(this).outerWidth(parentBlock.width());
    });

    $(".titles-side .cell").each(function() {

        $(this).append("<span class='right-border'></span>");

        $(this).find(".right-border").height($(this).outerHeight());

        var rightCoord = $(this).closest(".sliding_table").offset().left + $(this).closest(".sliding_table").width();

        $(this).find(".right-border").offset({left: rightCoord});

    });

});

function getArrowsPosition() {

    var arrowWrapp = $(".arrows_wrapp");
    var indexAttr;

    arrowWrapp.each(function() {

        $(this).find(".slides_btns_wrapp").each(function() {

            indexAttr = $(this).attr("data-arrow-index");

            parentBlock = $(this).closest(".table_slider_wrapp");

            slidingCell = parentBlock.find(".sliding_box .cell[data-cell-index ='"+indexAttr+"']");

            var topCoord = slidingCell.offset().top;

            $(this).offset({top: topCoord});

            $(this).find("button").css({
                "top" : ( slidingCell.outerHeight() - $(this).find("button").height() ) / 2
            });

        });

    });

}


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

        // console.log(rightCoord);

        $(this).offset({left: rightCoord});

    });

}

function getCellsHeight() {

    $(".sliding_table [data-heightel-index]").css({"height" : "auto"});

    $(".sliding_table").each(function() {

        parentBlock = $(this);

        heightElems = $(this).find(".titles-side [data-heightel-index]");

        heightElems.each(function() {

            indexAttr = $(this).attr('data-heightel-index');

            heightCells =  parentBlock.find("[data-heightel-index = '"+ indexAttr +"']");

            heightsArr = [];

            heightCells.each(function() {

                cellHeight = $(this).outerHeight();

                heightsArr.push(cellHeight);

                totalHeight = Math.max.apply(null, heightsArr);

            });

            parentBlock.find("[data-heightel-index = '"+ indexAttr +"']").outerHeight(totalHeight);

        });

    });

}

function getRightBorderParams() {

    $(".titles-side .cell").each(function() {

        $(this).find(".right-border").height($(this).outerHeight());

        var rightCoord = $(this).closest(".sliding_table").offset().left + $(this).closest(".sliding_table").width();

        $(this).find(".right-border").offset({left: rightCoord});

    });

}
