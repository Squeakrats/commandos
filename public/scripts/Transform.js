import vec2 from "./math/vec2"
import mat3 from "./math/mat3"

export default class Transform {
	constructor(position, rotation){
		this._position = new vec2(position.x, position.y);
		this._rotation = rotation;
		this.matrix = new mat3();//DO NOT DIRECTLY EDIT THIS MATRIX
		this.inverse = new mat3();
		this.updateMatrix();
	}

	get position() {
		return this._position.clone();
	}

	set position(pos) {
		this._position.copy(pos);
		this.updateMatrix();
	}

	get rotation() {
		return this._rotation;
	}

	set rotation(rot) {
		this._rotation = pos;
		this.updateMatrix();
	}

	updateMatrix(){
		var matrix = this.matrix.matrix;
		var cos = Math.cos(this._rotation), sin = Math.sin(this._rotation);

		matrix[0] = cos
		matrix[1] = sin;
		matrix[2] = 0;
		matrix[3] = -sin;
		matrix[4] = cos
		matrix[5] = 0;
		matrix[6] = this._position.x;
		matrix[7] = this._position.y;
		matrix[8] = 1;

		//speedy this up
		this.inverse = mat3.inverse(this.matrix);//dont make a garbage one every time. 
	}
}