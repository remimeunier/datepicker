function initBirthDayField(langue) {
	var hiddenInputID = $(this).attr('id');
	var dayInput = '<input class="focus-event date-verification refresh-category" id="day" max="31" min="1" name="day" placeholder="DD" type="number">';
	var monthInput = '<input class="focus-event date-verification refresh-category" id="month" max="12" min="1" name="month" placeholder="MM" type="number">';
	var yearInput = '<input class="date-verification refresh-category" id="year" max="2099" min="1" name="year" placeholder="YYYY" type="number">';

	$(this).hide();
	$(dayInput).insertAfter("#"+hiddenInputID);
	$(monthInput).insertAfter("#day");
	$(yearInput).insertAfter("#month");

}

function handleValidDateChange(input) {
  if (input.attr('id') == 'day') {
	  if (input.val() < 1) input.val(1);
	  if (input.val() > 31) input.val(31);
  }
  else if (input.attr('id') == 'month') {
	  if (input.val() < 1) input.val(1);
	  if (input.val() > 12) input.val(12);
  }
  else if (input.attr('id') == 'year') {
	  var date = new Date().getFullYear().toString().substring(2);
	  date = parseInt(date, 10);
	  if ( input.val() > date  && input.val() < 100) {
			input.val(19 + input.val());
	  }
	  else if (input.val() <= date && 1 < input.val()) input.val(20 + input.val());
	  else if ( (99 < input.val()) && (input.val() < (1900 + date))) input.val(1900 + date);
  }	
}

function automaticFocusChange(target) {
	target.find('input.focus-event').keyup(function (e) {
		//keyCode48 = 0, and keyCode57 = 9 , so this condition is pass only if the keyup is a number, 96 to 105, same but from numeric pad
		if ((e.keyCode >= 48 && 57 >= e.keyCode) || (e.keyCode >= 96 && e.keyCode <= 105)) {
			if ($(this).val().length == 2) {
				$(this).next('input').focus();
			}
		}
	});
}

function refreshDate(person_field_id, containerDateFields, inProduct, locale) {
	var day = containerDateFields.find("#day").val();
	var month = containerDateFields.find("#month").val();
	var year = containerDateFields.find("#year").val();

	if (inProduct != null) {
		if ((day != '') && (month != '') && (year != '')) {
			inProduct.find('.real-date-input-' + person_field_id).val(year + '-' + month + '-' + day);
			var date = new Date(year + '-' + month + '-' + day);
			var options = { year: 'numeric', month: 'long', day: 'numeric' };
			if (date.getDate() == day ) {
				containerDateFields.removeClass('error');
				containerDateFields.next().html(day + ' ' + globalMonth[locale][month -1] + ' ' + year);
			} else {
				containerDateFields.addClass('error');
				containerDateFields.next().html('unvalid date');
				$('.real-date-input-' + person_field_id).val('');
			}
		} else {
			$('.real-date-input-' + person_field_id).val('');
		}
	}
}