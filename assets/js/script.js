//Code by: Electroalek<http://electroalek.com>, 2020

$(document).ready(function(){

	$("form[method=post]").append(
		$("<input>")
			.attr("type", "hidden")
			.attr("name", "csrf")
			.attr("value", $("meta[name=csrf]").attr("content"))
	);

	$("form").submit(function(e){
		if($(this).hasClass("submitted")) {
			e.preventDefault();
		}else{
			$(this).addClass("submitted");
		}
	});

	$('[data-toggle="tooltip"]').tooltip();

	$(".auto-copy")
		.focus(function(e){
			$(this).select();
			try{
				document.execCommand("copy");
			}catch(e){
			}
		})
		.mouseup(function(e){
			e.preventDefault();
		});

	$("select").each(function(){
		var raw = $(this).data("value");
		if(raw == null || raw == undefined) return;
		$(this).find('option[value="' + raw + '"]').attr("selected", "selected");
	});

	$("input[type=datetime-local]").each(function(){
		var raw = $(this).data("value");
		if(raw == "" || raw == null || raw == undefined || raw == 0) return;
		var dateObj = new Date(raw * 1000);
		var formated = ""; //yyyy-MM-ddThh:mm
		formated += dateObj.getFullYear();
		formated += "-";
		formated += ((dateObj.getMonth() + 1) <= 9 ? "0" : "") + (dateObj.getMonth() + 1).toString();
		formated += "-";
		formated += (dateObj.getDate() <= 9 ? "0" : "") + dateObj.getDate().toString();
		formated += "T";
		formated += (dateObj.getHours() <= 9 ? "0" : "") + dateObj.getHours().toString();
		formated += ":";
		formated += (dateObj.getMinutes() <= 9 ? "0" : "") + dateObj.getMinutes().toString();
		$(this).val(formated);
	});

	$("input[type=date]").each(function(){
		var raw = $(this).data("value");
		if(raw == "" || raw == null || raw == undefined || raw == 0) return;
		var dateObj = new Date(raw * 1000);
		var formated = ""; //yyyy-MM-dd
		formated += dateObj.getFullYear();
		formated += "-";
		formated += ((dateObj.getMonth() + 1) <= 9 ? "0" : "") + (dateObj.getMonth() + 1).toString();
		formated += "-";
		formated += (dateObj.getDate() <= 9 ? "0" : "") + dateObj.getDate().toString();
		$(this).val(formated);
	});

	$(".toggle-password .input-group-text")
		.mousedown(function(){
			$(this).parent().parent().find("input").attr("type", "text");
			$(this).find("span").removeClass("fa-eye");
			$(this).find("span").addClass("fa-eye-slash");
		})
		.mouseup(function(){
			$(this).parent().parent().find("input").attr("type", "password");
			$(this).find("span").removeClass("fa-eye-slash");
			$(this).find("span").addClass("fa-eye");
		});

	if($(".auto-option").length){
		$(".auto-option").each(function(){
			var container = $(this);
			container.find(".auto-option-element").each(function(){
				var element = $(this);
				element.addClass("d-flex mb-3 mr-n4");
				element.append($("<button>")
					.attr("type", "button")
					.addClass("btn btn-link text-danger fa fa-trash-alt auto-option-remove")
					.click(function(){
						element.remove();
						container.trigger("auto-option-removed");
					})
				);
			});
			var copy = $(this).find(".auto-option-element").first().clone();
			copy.find("input").val("");
			copy.find("select").val("");
			copy.find("select option").prop("selected", false);
			copy.find("textarea").text("");
			container.prepend(
				$("<div>")
					.addClass("d-flex justify-content-end mr-n4") // mt-n4
					.append($("<button>")
						.attr("type", "button")
						.addClass("btn btn-link text-success fa fa-plus auto-option-remove")
						.click(function(){
							var fresh = copy.clone();
							fresh.find(".auto-option-remove").click(function(){
								fresh.remove();
								container.trigger("auto-option-removed");
							});
							container.append(fresh);
							container.trigger("auto-option-added");
						})
					)
			);
		});
	}

	$(window).scroll(function () {
		var $scrolling = $(this).scrollTop();
		var bc2top = $(".back-top-btn");
		if ($scrolling > 150) {
			bc2top.fadeIn(1000);
		} else {
			bc2top.fadeOut(1000);
		}
	});

	$(".back-top-btn").click(function (e) {
		e.preventDefault();
		$("html,body").animate({
			scrollTop: 0
		}, 1500);
	});

	AOS.init();

});