(function(){


	Array.from(document.querySelectorAll(".field")).forEach(function(el){
			el.addEventListener("input", function(){
				Array.from(document.querySelectorAll(".button-copy")).forEach(function(button){
					button.classList.remove("copied");
					button.innerHTML = "Copy";
					button.classList.add("btn-primary");
					button.classList.remove("btn-success");
				});
		});
	});
	Array.from(document.querySelectorAll(".button-copy")).forEach(function(button){
		button.addEventListener("click", function(){
			button.classList.add("copied");
			button.classList.add("btn-success");
			button.classList.remove("btn-primary");
			button.innerHTML = "Copied";
		});
	});
	function COPYWORD(word,noword){
		var fullHTML = `<html><head></head><body><!--StartFragment--><![if !supportFields]>${noword}<![endif]><!--[if supportFields]>${word}<![endif]--><!--EndFragment--></body></html>`;
		return fullHTML;
	}
	window.initCopyButton = function(el, obj){
		if(!obj){
			obj = el;
			el = document.querySelector(".button-copy");
		}
		if(typeof obj !== 'object'){
			obj = {word: obj}
		}
		if(typeof el == "string"){
			el = document.getElementById(el) || document.querySelector(el);
		}
		el.addEventListener("click", function(){
			var word = "";
			var noword = "";
			var text = "";
			if(obj.html){
				if(typeof obj.html == "function"){
					word = noword = obj.html.call(window)
				}
				else{
					word = noword = obj.html;
				}
			}
			else{
				if(obj.word){
					if(typeof obj.word == "function"){
						word = obj.word.call(window);
					}
					else{
						word = obj.word;
					}
				}
				else{ word = "!! No content copied !!"}

				if(obj.noword){
					if(typeof obj.noword == "function"){
						noword = obj.noword.call(window);
					}
					else{
						noword = obj.noword;
					}
				}
				else{ noword = "!! You must paste this content in Microsoft Word !!"}
			}
			if(obj.text){
				if(typeof obj.text == "function"){
					text = obj.text.call(window)
				}
				else{
					text = obj.text;
				}
			}
			else{
				text = "!! You must paste this content as rich-text !!";
			}
			var content = COPYWORD(word, noword);
			console.log(content);
			function listener(e) {
				e.clipboardData.setData("text/html", content);
				e.clipboardData.setData("text/plain", text);
				e.preventDefault();
			}
  			document.addEventListener("copy", listener);
  			document.execCommand("copy");
  			document.removeEventListener("copy", listener);
		});
	}
	window.val = function(id){
		return (document.getElementById(id)||document.querySelector(id)||{}).value
	}
})();