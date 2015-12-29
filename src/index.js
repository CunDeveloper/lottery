$(function(){
	var height = $(window).height();
	var IMG_BASE = "images/";
	$("#dialog").dialog({
		width:400,
		modal:true,
		buttons:{
			OK:function(){
				$(this).dialog('close');
				$('#display_image').addClass('display_container');
				$('#main').addClass('main');
				$('#bigImg').addClass('big_head_icon');

				$('#bigImg').attr('src',IMG_BASE+fileNames[randomInt(fileNames.length-1)]);
				$('#winner_list').addClass('winner_list');
				$('hr').css('display','block');
				$('#winner_list').text("获奖人员的名单");
				  for (var i = fileNames.length - 1; i >= 0; i--) {
                    console.log(fileNames[i]);
                     $("#head_icon_container").append("<img class =small_image src="+IMG_BASE+fileNames[i] +" />");
                 };
                 exeTask();
			}
		}
	});
	document.getElementById('fileInput').addEventListener('change', readMultipleFiles, false);

	function randomInt(size) {
		return Math.floor((Math.random() * size));
	}

	//every 3 seconds (3000 milliseconds):
	function exeTask() {
		setInterval(replacePic,3000);
	}

	function replacePic(){
		 var random = randomInt(fileNames.length-1);
		$('#bigImg').attr('src',IMG_BASE+fileNames[random]);
	}

	 
});