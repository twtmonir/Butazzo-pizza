/*
Abstract : Ajax Page Js File
File : bp.ajax.js
#CSS attributes: 
	.bpForm : Form class for ajax submission. 
	.bpFormMsg  : Div Class| Show Form validation error/success message on ajax form submission

#Javascript Variable
.bpRes : ajax request result variable
.bpFormAction : Form action variable
.bpFormData : Form serialize data variable

*/

function contactForm()
{
	window.verifyRecaptchaCallback = function (response) {
        $('input[data-recaptcha]').val(response).trigger('change');
    }

    window.expiredRecaptchaCallback = function () {
        $('input[data-recaptcha]').val("").trigger('change');
    }
	'use strict';
	var msgDiv;
	$(".bpForm").on('submit',function(e)
	{
		e.preventDefault();	//STOP default action
		$('.bpFormMsg').html('<div class="gen alert alert-success">Submitting..</div>');
		var bpFormAction = $(this).attr('action');
		var bpFormData = $(this).serialize();
		
		$.ajax({
			method: "POST",
			url: bpFormAction,
			data: bpFormData,
			dataType: 'json',
			success: function(bpRes){
				if(bpRes.status == 1){
					msgDiv = '<div class="gen alert alert-success">'+bpRes.msg+'</div>';
				}
				
				if(bpRes.status == 0){
					msgDiv = '<div class="err alert alert-danger">'+bpRes.msg+'</div>';
				}
				$('.bpFormMsg').html(msgDiv);
				
				
				setTimeout(function(){
					$('.bpFormMsg .alert').hide(1000);
				}, 10000);
				
				$('.bpForm')[0].reset();
                grecaptcha.reset();
			}
		})
	});
	
	
	/* This function is for mail champ subscription START*/
	$(".bpSubscribe").on('submit',function(e)
	{
		e.preventDefault();	//STOP default action
		var thisForm = $(this);
		var bpFormAction = thisForm.attr('action');
		var bpFormData = thisForm.serialize();
		thisForm.addClass('bp-ajax-overlay');
		
		$.ajax({
			method: "POST",
			url: bpFormAction,
			data: bpFormData,
			dataType: 'json',
		  success: function(bpRes) {
			thisForm.removeClass('bp-ajax-overlay');  
			if(bpRes.status == 1){
				msgDiv = '<div class="gen alert alert-success">'+bpRes.msg+'</div>';
			}
			if(bpRes.status == 0){
				msgDiv = '<div class="err alert alert-danger">'+bpRes.msg+'</div>';
			}
			$('.bpSubscribeMsg').html(msgDiv);
			
			setTimeout(function(){
				$('.bpSubscribeMsg .alert').hide(1000);
			}, 10000);
			
			$('.bpSubscribe')[0].reset();
		  }
		}) 
	});
	
	/* This function is for mail champ subscription END*/
	
}


jQuery(document).ready(function() {
    'use strict';
	contactForm();
})	