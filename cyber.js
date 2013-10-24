function init() {
	//Create Console
	var console = $('#shell');
	controller = console.console({
		promptLabel: 'root$ ',
		commandValidate: function(line) {
			if (line == "") return false; // Empty line is invalid
            else return true;
		},
		cancelHandle:function(){
			controller.commandRef.ignore = true;
  			controller.finishCommand();
			controller.report();
		},
		commandHandle:function(line,report){
			report([{msg:'test', className:"jquery-console-message-type"}]);
		},
		charInsertTrigger:function(keycode,line){
			//Non-interactive shell
			return false;
		},
		autofocus:true,
		promptHistory:true
	});
	
	//Cursor blinking algorithm, TODO: end loop, save resources
	var cursorBlink = setInterval(function() {
		// This is fired for each sound that is registered.
		var cursor = $(".jquery-console-cursor");
		if(!parseFloat(cursor.css("opacity")))
			cursor.css("opacity", "0.5");
		else
			cursor.css("opacity", "0.0");
	}, 500);
	
	typeChars("wget http://lockup.com/kernel", function () {
		typeChars("xstart");
	});
}

if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', init, false);
} else {
  window.onload = init;
}

function typeChars(textToEnter, callback) {
	var index = 0;
	var textEnter = setInterval(function() {
		var character = textToEnter.charAt(index);
		if(character != " ")
			consoleIns(character);
		else 
			consoleIns(32);
		index++;
		if(index >= textToEnter.length) {
			window.clearInterval(textEnter);
			setTimeout(function() {
				cmdtrigger();
				if(callback)
					callback();
			}, 500);
		}
	}, 90);
}

function playAudioFile(file) {
	createjs.Sound.registerSound(file, "sound");
	var instance = createjs.Sound.play("sound");  // play using id.  Could also use full sourcepath or event.src.
	instance.volume = 0.5;
}