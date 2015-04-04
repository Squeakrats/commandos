import mat3 from "./math/mat3"

export default class Sprite extends Entity{
	
	constructor(position, width, height, textureName) {
		super(position, 0);
		this.width = width;
		this.height = height;
		this.textureName = textureName;

		this.vertices = new Float32Array([
			 .5,  .5, 
			-.5,  .5,
			-.5, -.5,
			 .5,  .5,
			-.5, -.5,
			 .5, -.5 
		])

		this.uvs = new Float32Array([
			1, 1,
			0, 1,
			0, 0,
			1, 1,
			0, 0,
			1, 0
		])

	}
}