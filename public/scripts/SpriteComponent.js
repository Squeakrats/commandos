import vec2 from "./math/vec2"
import mat3 from "./math/mat3"
var nextId = 0;
export default class SpriteComponent {//should implement renderable or somthing. 

	constructor (actor, width, height, textureName) {
		this.id = nextId++;
		this.actor = actor;
		this.matrix = mat3.createScaling(width, height);
		this.textureName = textureName;
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
	
	//actor.scale.x vs actor.spriteComponent



}