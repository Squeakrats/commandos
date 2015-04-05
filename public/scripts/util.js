export function loadFile (url) {
	var request = new XMLHttpRequest();
	var promise = new Promise((resolve) => {
		request.onload = function () {
			resolve(this.responseText);
		}
	})
	request.open("GET", url, true);
	request.send();
	return promise;
}
export function loadJSON(url) {
	return new Promise((resolve)=> {
		loadFile(url).then((data) => {
			resolve(JSON.parse(data)) //assume well formed JSON. 
		})
	})
}

export function loadImage(url) {
	return new Promise((resolve) => {
		var image = new Image();
		image.onload = function() {
			resolve(this);
		}
		image.src = url
	})
}