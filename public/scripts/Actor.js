import vec2 from "./math/vec2"
import mat3 from "./math/mat3"

export default class Actor {

	constructor(position, rotation) {
		this.components = {};
		this.position = new vec2(position.x, position.y);
		this.rotation = rotation;
		this.matrix = mat3.createIdentity();
		this.updateMatrix();
	}

	addComponent(component) {
		this.components[component.constructor.name] = component;
	}

	getComponent(componentName) {
		return this.componenents[componentName]
	}
	

	updateMatrix() {
		var matrix = this.matrix.matrix;
		var cos = Math.cos(this.rotation), sin = Math.sin(this.rotation);

		matrix[0] = cos
		matrix[1] = sin;
		matrix[2] = 0;
		matrix[3] = -sin;
		matrix[4] = cos
		matrix[5] = 0;
		matrix[6] = this.position.x;
		matrix[7] = this.position.y;
	}
}