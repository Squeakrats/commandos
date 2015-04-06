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

	static loadFormatted(url) {//only load pngs for now
		var fileName = url.match("[a-zA-Z0-9]+.(png|jp[e]?g)")[0];
		var extension = fileName.split(".")[1];
		var jsonURL = url.replace(extension, "json")

		return new Promise((resolve) => {
			Promise.all([loadImage(url), loadJSON(jsonURL)]).then((results)=>{
				var image = results[0], uvs = results[1];
				var textures = {};
				for(let key in uvs){
					textures[key] = new Texture(key, url, image, uvs[key]);
				}
				resolve(textures)
			})
		})
	}

	static loadFormattedBatch(urls) {
		return new Promise((resolve, reject) => {
			if(urls === undefined || urls.length == 0){
				reject("No urls :(")
			}
			var textures = {};
			Promise.all(urls.map( (url) =>  { return this.loadFormatted(url) } )).then((files) =>{
				for(let file of files){
					for(var key in file){
						textures[key] = file[key]
					}
				}
				resolve(textures);
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