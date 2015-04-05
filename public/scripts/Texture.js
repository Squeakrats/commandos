import {loadImage, loadJSON} from "./util"

export default class Texture {

	constructor(name, src, data, uv){//dont ever call this direcrly
		this.name = name;
		this.src = src;//@TODO load from pixel data as well. 
		this.data = data;

		if(uv === undefined){
			this.uv = new Float32Array([
				1, 1,
				0, 1,
				0, 0,
				1, 1,
				0, 0,
				1, 0
			])	
		}else{
			this.uv = new Float32Array([
				uv[4], uv[5],
				uv[6], uv[7],
				uv[0], uv[1],

				uv[4], uv[5],
				uv[0], uv[1],
				uv[2], uv[3]
				])
		}

		//each texture needs its own uv, but not its own gl context image

		//make the gl buffer???/ would make the most sense to make the texture on a per 
		
	}

	static loadAtlas(url) {//only load pngs for now
		var imageURL = url, jsonURL = url.replace(".png", ".json");
		return new Promise((resolve) => {
			Promise.all([loadImage(imageURL), loadJSON(jsonURL)]).then((results)=>{
				var image = results[0], uvs = results[1];
				var textures = {};
				for(let key in uvs){
					textures[key] = new Texture(key, url, image, uvs[key]);
				}
				resolve(textures)
			})
		})
	}

	static load(name, url) {//@TODO test this
		return new Promise((resolve) => {
			loadImage(url).then((image) =>{
				resolve(new Texture(name, url, image));
			})
		})
	}

}