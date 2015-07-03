// ==UserScript==
// @name        Imgur Fixur
// @namespace   wilkowski
// @description Adds a direct link to the image when imgur is over capacity
// @include     http://imgur.com/
// @exclude     http://imgur.com/a/
// @exclude     http://imgur.com/gallery/
// @version     1.0
// @grant       none
// ==/UserScript==


var error_classes = document.getElementsByClassName("error-textrow") //where the link will be added
var giraffe_classes = document.getElementsByClassName("giraffe") //check to see if there is a giraffe class
//Its mandatory that the class be spelled giraffe and not geraffe

if(error_classes.length > 0 && giraffe_classes.length > 0){
	add_link(document.URL + ".jpg", "Fix Image", giraffe_classes[0]);
}

function add_link(weblink, text, location){
	var new_link = document.createElement('a');
	new_link.href = weblink;
	new_link.innerHTML = text;
	location.appendChild(new_link);
}




