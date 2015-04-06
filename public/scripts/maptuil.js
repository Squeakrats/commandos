import {loadJSON} from "./util"
import Textrure from "./Textrure"
export function loadMap(url) {
	return new Promise((resolve) => {
		loadJSON(url).then((data) => {
			//load up the textrures 
			Promise.all(data.images.map((url) => { Texture.loadAtlas(url)})).then(function(textures){
				var 
			})
			data.images.forEach(function(image){

			})





			var map = [];
			for(var y = 0; y < data.length;y++){
				var row = data[y];
				map[y] = [];
				for(var x = 0; x < row.length;x++){
					var tile = row[x];
					map[y][x] = {
						
					}

				}
			}
		})
	})
}