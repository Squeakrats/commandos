import vec2 from "./math/vec2"
import mat3 from "./math/mat3"
var nextId = 0;
export default class Sprite {//should implement renderable or somthing. 
	constructor (transform, width, height, textureName) {
		this.renderType = "Sprite";
		this.id = nextId++;
		this.transform = transform;
		this.matrix = mat3.createScaling(width, height);
		this.textureName = textureName;
		this.zIndex = 0;
	}

	get width () {
		return this.matrix.matrix[0];
	}

	set width(value) {
		this.matrix.matrix[0] = value
	}

	get height () {
		return this.matrix.matrix[4];
	}

	set height(value) {
		this.matrix.matrix[4] = value
	}
}