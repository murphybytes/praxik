// JavaScript Document
jQuery(document).ready( function() {
	jQuery('.menu_select').change(function() {
		window.location = jQuery(this).val();
	});
});