import mat3 from "./math/mat3"
import vec2 from "./math/vec2"
import {createProgram} from "./glutil"

export default class Renderer {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.domElement = document.createElement("canvas");
		this.gl = this.domElement.getContext("webgl");
		this.domElement.width = width;
		this.domElement.height = height;
		this.gl.viewport(0,0,width,height);
		this.gl.clearColor(0,0,0,1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.textures = {};
		//could also just make the single vertex/uv array master here but yolo.
		this.entities = {}

		this.spriteProgram = createProgram(this.gl, document.getElementById("vertex").innerHTML, document.getElementById("fragment").innerHTML)
	}

	isSpriteLoaded(sprite) {
		return !(this.entities[sprite.id] === undefined)
	}

	loadSprite(sprite) {
		var gl = this.gl;
		var vertexBuffer = gl.createBuffer(), 
			uvBuffer = gl.createBuffer();

		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, sprite.vertices, gl.STATIC_DRAW);

		gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, sprite.uvs, gl.STATIC_DRAW);
		this.entities[sprite.id] = [
			{location : 0, size : 2, buffer : vertexBuffer },
			{location : 1, size : 2, buffer : uvBuffer}
		]
	}

	setupAttributes(attributes) {
		var gl = this.gl
		for(let attribute of attributes) {
			gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
			gl.vertexAttribPointer(attribute.location, attribute.size, gl.FLOAT, false, 0, 0);

		}
	}

	render(scene, camera) {
		var gl = this.gl;
		gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		gl.useProgram(this.spriteProgram);//assume everything is a sprite for now
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		var mvMatrixLocation = gl.getUniformLocation(this.spriteProgram, "mvMatrix");

		camera.updateMatrix();

		for(let sprite of scene.children) {

			if(!this.isSpriteLoaded(sprite)) this.loadSprite(sprite);

			sprite.actor.updateMatrix();//this def needs to be automated or somthing
			//also alow recursives (push/pop) calls later so we can have sprite containers. 
			var mvMatrix = mat3.multiply(camera.ortho,  camera.inverse );
				mvMatrix = mat3.multiply(mvMatrix, sprite.actor.matrix)
				mvMatrix = mat3.multiply(mvMatrix, sprite.matrix)

			this.setupAttributes(this.entities[sprite.id]);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindTexture(gl.TEXTURE_2D, this.textures[sprite.textureName]);
			//now we can set up uniforms. 
			gl.uniformMatrix3fv(mvMatrixLocation, false, mvMatrix.matrix);
			gl.drawArrays(gl.TRIANGLES, 0, 6);//sprites always have 6,,,,
		}
	}
}