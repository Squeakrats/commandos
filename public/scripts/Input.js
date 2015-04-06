export default class Input {
	constructor(){
		var keys = this.keys = {};

		addEventListener("keydown", function(e) {
			var key = String.fromCharCode(e.keyCode)
			keys[key] = true;
		})

		addEventListener("keyup", function(e) {
			var key = String.fromCharCode(e.keyCode)
			delete keys[key];
		})
	}


	isKeyDown(key) {
		return this.keys[key] == true; 
	}
}