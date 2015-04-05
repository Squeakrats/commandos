import mat3 from "./math/mat3"
import vec2 from "./math/vec2"
import {createProgram, createTextureFromImage} from "./glutil"

export default class Renderer {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.domElement = document.createElement("canvas");
		var gl = this.gl = this.domElement.getContext("webgl");
		this.domElement.width = width;
		this.domElement.height = height;
		gl.viewport(0,0,width,height);
		gl.clearColor(0,0,0,1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		this.textures = {};
		//could also just make the single vertex/uv array master here but yolo.
		this.entities = {}

		this.glTextures = {}
		this.textures = {};

		this.spriteProgram = createProgram(gl, document.getElementById("vertex").innerHTML, document.getElementById("fragment").innerHTML)
		
		this.spriteVertexBuffer = gl.createBuffer();


		gl.bindBuffer(gl.ARRAY_BUFFER, this.spriteVertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			 .5,  .5, 
			-.5,  .5,
			-.5, -.5,
			 .5,  .5,
			-.5, -.5,
			 .5, -.5 
		]), gl.STATIC_DRAW);
	}

	addTexture(texture) {
		var gl = this.gl;
		if(this.textures[texture.name] === undefined){ //build uvs
			var uvBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, texture.uv, gl.STATIC_DRAW);
			this.textures[texture.name] = {
				uvBuffer : uvBuffer,
				texture : texture
			}
		}
		if(this.glTextures[texture.src] === undefined){//build texture
			this.glTextures[texture.src] = createTextureFromImage(gl, texture.data)//@TODO DONT ASSUME ALL TEXTURES ARE IMAGES.
		}
	}

	addTextures(textures){
		for(var key in textures){
			this.addTexture(textures[key]);
		}
	}

	setupTexture(textureName) {
		var gl = this.gl;
		var texture = this.textures[textureName];
		if(texture === undefined){
			console.log('WARNING:ATTEMPTING TO RENDER AN UNKNOWN TEXTURE ${textureName}')
			//figure out why harmony template literals are not working @TODO
			return;
		}
		var glTexture = this.glTextures[texture.texture.src]
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, glTexture);

		gl.bindBuffer(gl.ARRAY_BUFFER, texture.uvBuffer);
		gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);
		//verify we have the sprite loaded. 
	}

	render(scene, camera) {//@TODO dont assume everything is a sprite. huaehuaheuae
		var gl = this.gl;
		gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		gl.useProgram(this.spriteProgram);//assume everything is a sprite for now
		gl.enableVertexAttribArray(0);
		gl.enableVertexAttribArray(1);
		var mvMatrixLocation = gl.getUniformLocation(this.spriteProgram, "mvMatrix");

		gl.bindBuffer(gl.ARRAY_BUFFER, this.spriteVertexBuffer);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

		for(let sprite of scene.children) {

			this.setupTexture(sprite.textureName);
			//console.log(camera.transform.inverse)
			//also alow recursives (push/pop) calls later so we can have sprite containers. 
			var mvMatrix = mat3.multiply(camera.ortho,  camera.transform.inverse );
				mvMatrix = mat3.multiply(mvMatrix, sprite.actor.transform.matrix)
				mvMatrix = mat3.multiply(mvMatrix, sprite.matrix)

			gl.uniformMatrix3fv(mvMatrixLocation, false, mvMatrix.matrix);
			gl.drawArrays(gl.TRIANGLES, 0, 6);//sprites always have 6,,,,
		}
	}
}