import mat3 from "./math/mat3"
import vec2 from "./math/vec2"

export default class Camera {
	constructor(width, height) {
		this.position = new vec2();
		this.width = width;
		this.height = height;
		this.ortho = mat3.createScaling(1/width, 1/height);
		this.view = mat3.createIdentity();
		this.inverse = mat3.createIdentity();
	}

	updateMatrix(){
		//positions soon.
		this.inverse = mat3.inverse(this.view);
	}
}