var globalMonth = {
	fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre', 'unvalid date'],
	zh: ['一月','二月','三月','四月','五月','六月', '七月','八月','九月','十月','十一月','十二月', 'unvalid date'],
	ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', 'unvalid date'],
	vi: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai', 'unvalid date'],
	en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', 'date invalide']
};

(function( $ ){
  $.fn.initBirthDayField = function(locale) {
	var $hiddenInput = $(this);
	var hiddenInputID = $hiddenInput.attr('id');
	var containerID = hiddenInputID +'-container';
	var $target = $('#target');
	var dayInput = '<input class="focus-event date-verification refresh-category" id="day" max="31" min="1" name="day" placeholder="DD" type="number">';
	var monthInput = '<input class="focus-event date-verification refresh-category" id="month" max="12" min="1" name="month" placeholder="MM" type="number">';
	var yearInput = '<input class="date-verification refresh-category" id="year" max="2099" min="1" name="year" placeholder="YYYY" type="number">';

	$("<div class='container' id='" + containerID + "'></div> <span class='" + hiddenInputID + "-target'></span>").insertAfter($hiddenInput);
	var $container = $('#' + containerID);
	$container.append(dayInput + '/' + monthInput + '/' + yearInput);

	$hiddenInput.hide();


	automaticFocusChange($container);
  $container.find('input').change(function() {
    handleValidDateChange($(this));
    refreshDate($hiddenInput, $container, locale);
  });
   };
})( jQuery );

function handleValidDateChange(input) {
  if (input.attr('id') == 'day') {
	  if (input.val() < 1) input.val(1);
	  if (input.val() > 31) input.val(31);
	  if (input.val() == null) input.val('');
  }
  else if (input.attr('id') == 'month') {
	  if (input.val() < 1) input.val(1);
	  if (input.val() > 12) input.val(12);
	  if (input.val() == null) input.val('');
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

function automaticFocusChange($container) {
	$container.find('input.focus-event').keyup(function (e) {
		if ((e.keyCode >= 48 && 57 >= e.keyCode) || (e.keyCode >= 96 && e.keyCode <= 105)) {
			if ($(this).val().length == 2) {
				$(this).next('input').focus();
			}
		}
	});
}

function refreshDate($hiddenInput, container, locale) {
	var day = container.find("#day").val();
	var month = container.find("#month").val();
	var year = container.find("#year").val();


		if ((day != '') && (month != '') && (year != '')) {
			$hiddenInput.val(year + '-' + month + '-' + day);
			var date = new Date(year + '-' + month + '-' + day);
			var options = { year: 'numeric', month: 'long', day: 'numeric' };
			if (date.getDate() == day ) {
				container.removeClass('error');
				container.next().html(day + ' ' + globalMonth[locale][month -1] + ' ' + year);
			} else {
				container.addClass('error');
				container.next().html(globalMonth[locale][13]);
				$hiddenInput.val('');
			}
		} else {
			$hiddenInput.val('');
		}
}
