export default class vec2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	add(b) {
		this.x +=b.x;
		this.y +=b.y;
		return this;
	}

	sub(b) {
		this.x -=b.x;
		this.y -=b.y;
		return this;
	}

	scale(s) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	len() {
		var x = this.x, y = this.y;
		return Math.sqrt(x*x+y*y);
	}

	normalize(){
		this.scale(1/this.len());
		return this;
	}

	clone() {
		return new vec2(this.x, this.y);
	}

	copy(b) {
		this.x = b.x;
		this.y = b.y;
	}

	static add(a, b) {
		return new vec2(a.x + b.x, a.y + b.y);
	}

	static sub(a, b) {
		return new vec2(a.x - b.x, a.y - b.y);
	}

	static dot(a, b) {
		return a.x * b.x + a.y * b.y;
	}

	static lerp(a, b, u) {
		return new vec2( a.x * (1-u) + b.x * u, a.y * (1-u) + b.y * y);
	}
}