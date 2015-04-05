import mat3 from "./math/mat3"
import vec2 from "./math/vec2"
import Transform from "./Transform"
export default class Camera {
	constructor(width, height) {
		this.ortho = mat3.createScaling(1/width, 1/height);
		this.transform = new Transform(new vec2(0,0), 0);
	}
}