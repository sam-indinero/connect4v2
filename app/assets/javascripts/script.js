/**
 * This function executes when entire page is loaded
 */
$(document).ready(function(){
    
    /**
     * Is the next move blue?
     * 
     * @type Boolean
     */
    var isBlue = true;
    
    /**
     * Function to run when anything with class='drop' is clicked
     */
    $('.drop').click(function(event){
        // don't follow the link
        event.preventDefault();
        
        // which column?
        var col = $(this).data('col');
        
        if (isBlue == true) {
            color = 'blue';
            isBlue = false;
        } else {
            color = 'yellow';
            isBlue = true;
        }
        
        // which td
        var tdid = $("td[data-col=" + col +"].empty").last().attr('id');
        
        $("#" + tdid).addClass(color);
        $("#" + tdid).removeClass('empty');
        
        //alert(tdid);
        // check for winners
        var bingo=check_for_four(color, tdid);
        
        if (bingo== true) {
            alert("Yey! We have a winner, " + color +" Player wins!");
            clear_board();
        }
    });
    
    function clear_board() {
    	for (i = 1; i < 43; i += 1) {
			if (!$('#' + i).hasClass('empty')) {
				if ($('#' + i).hasClass('blue')) {
					$('#' + i).removeClass('blue');
				} else {
					$('#' + i).removeClass('yellow');
				}
				$('#' + i).addClass('empty');
			}
    	}
    	
    }
    
    
    function check_for_four(color, square) {
		
        var original_square = square;
        
		function consec_four() {
			if ($('#' + i).hasClass(color)) {
				consec_count += 1;
				if (consec_count == 4) { return true; }
			} else {
				consec_count = 0;
			}
		}
		
		function check_horiz_win(color, square) {
			consec_count = 0;
			for (i = square; i < square + 7; i += 1) {
				if (consec_four()) {
					return true;	
				}
			}
		}
		
		// check for vertical win
		
		while (square > 7) {
			square -= 7;
		}
		for (i = square; i < 43; i += 7) {
			if (consec_four()) {
				return true;
			}
		}
		var square = original_square;
		
		// check for horizontal win
		var left_squares = [1, 8, 15, 22, 29, 36];
		var in_array = jQuery.inArray(square, left_squares);
		
		if (in_array > -1) {
			if (check_horiz_win(color, square)) {
				return true;
			}
		} else {
			while (result = jQuery.inArray(square, left_squares) == -1) {
				square -= 1;
				if (result = jQuery.inArray(square, left_squares) !== -1) {
					if (check_horiz_win(color, square)) {
						return true;	
					}
				}
			}
		}
		
		// check for diagonal win
		
        function check_slash_win(color, square) {
			consec_count = 0;
			for (i = square; i < 43; i += 6) {
			if (consec_four()) {
				return true;
			}
		  }
		}
        
        consec_count = 0;
		var square = original_square;
		var right_corner_squares = [4, 5, 6, 7, 14, 21];
        var in_array = jQuery.inArray(square, right_corner_squares);
        
        if (in_array > -1) {
			if (check_slash_win(color, square)) {
				return true;
			}
		} else {
			while (result = jQuery.inArray(square, right_corner_squares) == -1) {
				square -= 1;
                //alert(square);
				if (result = jQuery.inArray(square, right_corner_squares) !== -1) {
					if (check_slash_win(color, square)) {
						return true;	
					}
				}
			}
		}
        
        function check_backslash_win(color, square) {
			consec_count = 0;
			for (i = square; i < 43; i += 8) {
			if (consec_four()) {
				return true;
			}
		  }
		}
        
        consec_count = 0;
		var square = original_square;
		var left_corner_squares = [1, 2, 3, 4, 8, 15];
        var in_array = jQuery.inArray(square, left_corner_squares);
        
        if (in_array > -1) {
			if (check_backslash_win(color, square)) {
				return true;
			}
		} else {
			while (result = jQuery.inArray(square, left_corner_squares) == -1) {
				square -= 1;
                //alert(square);
				if (result = jQuery.inArray(square, left_corner_squares) !== -1) {
					if (check_backslash_win(color, square)) {
						return true;	
					}
				}
			}
		}
		
		
		
		return false; // no horizontal, vertical or diagonal win found
	}
    
});