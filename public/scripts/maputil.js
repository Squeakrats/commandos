import {loadJSON} from "./util"
import Texture from "./Texture"
export function loadMap(url) {
	return new Promise((resolve) => {
		loadJSON(url).then((data) => {
			Texture.loadFormattedBatch(data.images).then( (textures) => {
				data.textures = textures;
				resolve(data)
			})
		})
	})
}