$(function(){
	var height = $(window).height();
	var IMG_BASE = "images/";
	var date = new Date();
	var hour = 0;
	var minute = 0;
	var changePhotoInterval = {};
	var index = 0;
	var nextMinute = 0;
	// when fileNames.length ==0.show dialog ,ask user to import pics
	if (fileNames.length ==0) {
		showDialog();
	} else {
		addContent();
		exeTask();
		$('#dialog').hide();
		loadPicIntoFooter();
		refreshTime();
	}
	
	//show input dialog when to run firstly
	function showDialog() {

	  $("#dialog").dialog({
		width:400,
		modal:true,
		buttons:{
			OK:function(){
				$(this).dialog('close');
				addContent();
				loadPicIntoFooter();
                exeTask();
                refreshTime();
			}
		}
	  });
	  document.getElementById('fileInput').addEventListener('change', readMultipleFiles, false);
	}

     function refreshTime() {
     	setInterval(currentTime, 1000);
     }

     function currentTime() {
		date = new Date();
		hour = date.getHours();
		minute = date.getMinutes();
		$('#date').text(date.toLocaleString());
		judgeTime();
	}

	// lucky time ~
	function judgeTime() {
		if (hour >= 9&& date.getSeconds() == 0) {
			if (minute == nextMinute) {
				// stop change photo
				clearInterval(changePhotoInterval);
				// add name to input area
				var name = fileNames[index];
				console.log(name);
				var splitNames = name.split(".");
				$('#awards_list').append("<h3 class=awardName >"+splitNames[0]+"</h3>");
				awardNames.push(splitNames[0]);
			
				// change background
				addBigPic(name);
				$('#img'+index).hide();// remove img from footer 
				fileNames.splice(index, 1);
				// show the lucky person's photo
				setTimeout(exeTask,5*60*1000);
					// delete photo from array
				
				
			}
		}
	}

	// load pic into footer
	function loadPicIntoFooter() {
		for (var i = fileNames.length - 1; i >= 0; i--) {
			var html="<div class =col ><img id=img"+i+" class =small_image src="+IMG_BASE+fileNames[i] +" /></div>";
			//"<img id=img"+i+" class =small_image src="+IMG_BASE+fileNames[i] +" />"
            $("#header_container").append(html);
            $('#img'+i).attr("height",$('#img'+i).width());
        };
	}

	function randomInt(size) {
		return Math.floor((Math.random() * size));
	}

	//every 3 seconds (3000 milliseconds):
	function exeTask() {
		changePhotoInterval = setInterval(replacePic,3000);
		//nextMinute = Math.floor(Math.random() * 6);
		nextMinute = 28;
	}

	function replacePic(){
		 index = randomInt(fileNames.length-1);
		 var name = fileNames[index];
		 addBigPic(name);
	}

    function addBigPic(name) {
    	$('#bigPic').attr('src',IMG_BASE+name);
		$('#display_name').text(name.split(".")[0]);
    }

	function addContent() {
		$('#show_container').addClass('show_container');
		$('#main').addClass('main');
		$('#bigPic').addClass('bigPic');

		var name = fileNames[randomInt(fileNames.length)];
		addBigPic(name);

		$('#awards_list').addClass('awards_list');
		$('hr').css('display','block');
		$('#awards_list').append("<h1 class =awardName>"+"获奖人员名单"+"</h1>");
		for (var i = awardNames.length - 1; i >= 0; i--) {
			$('#awards_list').append("<h3 class =awardName>"+awardNames[i]+"</h3>");
		};
		$('#date').text(date.toLocaleString());

	}

	function saveFileNamesToLocal(fileNames) {
		if (isSupportLocalStorage){
			for (var i = fileNames.length - 1; i >= 0; i--) {
				console.log("savefilenames==="+fileNames[i]);
			   	 localStorage.setItem(fileNames[i],fileNames[i]);
			}
		}else{
			alert("You browser don't support localStorage , please change to anohter browser!!!");
		}
	}

	function saveAwardNamesToLocal(awardNames) {
		if (isSupportLocalStorage){
			for (var i = awardNames.length - 1; i >= 0; i--) {
			   	 localStorage.setItem(awardNames[i],awardNames[i]);
			}
		}else{
			alert("You browser don't support localStorage , please change to anohter browser!!!");
		}
	}

	function isSupportLocalStorage(){
		if (type(Storage) !=="undefined"){
			return true;
		}else{
			return false;
		}
	}

	//detect browser's close event
	$(window).bind("beforeunload", function() { 
		  saveFileNamesToLocal(fileNames);
		  saveAwardNamesToLocal(awardNames);
          return "Are you sure close browser!!!";
    });

});