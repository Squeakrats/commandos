import vec2 from "./math/vec2";
import mat3 from "./math/mat3";
//import Sprite from "./Sprite";
import Camera from "./Camera";
import Renderer from "./Renderer"
import Scene from "./Scene"
import Actor from "./Actor"
import Commando from "./Commando"
import Sprite from "./Sprite"
import {createTextureFromUrl} from "./glutil"
import Transform from "./Transform"
import {loadFile, loadJSON} from "./util"
import Texture from "./Texture";
import ObjectContainer from "./ObjectContainer"
import Input from "./Input";
import {loadMap} from "./maputil"
import GridContainer from "./GridContainer"
import {AStarGrid} from "./AStar"

var grid = new AStarGrid(10, 10);
	grid.search(grid.grid[0][0], grid.grid[4][4])

/*
implement z-index. !!Important 
create or find a texture atlas so I can start baking textures together in batches. 
look up full promize spec. I think im doing it wrong (too much nesting)

*/

var renderer = new Renderer(800, 500);
document.body.appendChild(renderer.domElement);
var camera = new Camera(800/2, 500/2);
var scene = new Scene();
var input = new Input();




var buildPlayer = function (position, rotation) {
	var actor = new Commando( new Transform (new vec2(0,0), 0));
	actor.addComponent(new Sprite(actor.transform, 64, 64, "player1"));
	return actor;
}

var actor = buildPlayer(new vec2(0,0), 0);

Texture.load("player1", "assets/player1.png").then((texture) => {
	renderer.addTexture(texture)
})
loadMap("assets/map1.json").then((data) => {
	renderer.addTextures(data.textures);
	var map = data.map;
	var tiles = data.tiles;
	var blockSize = data.blockSize;
	var gridcontainer = new GridContainer(new Transform(new vec2(0,0), 0), blockSize);

	var height = map.length * blockSize;
	for(var y = 0; y < map.length;y++){
		var row = map[y];
		for(var x = 0; x < row.length;x++){
			var tile = tiles[row[x]];
			var transform = new Transform(new vec2(x * blockSize, height - y * blockSize), 0)
			var sprite = new Sprite(transform, blockSize, blockSize, tile.texture);

			gridcontainer.addChild(x, map.length -y, sprite);
			//scene.addChild(sprite)
			//creat sprite and add it to the scene 
		}
	}

	scene.addChild(gridcontainer);
	scene.addChild(actor.components.Sprite)

	//console.log(map)

})











setTimeout(function(){
	var last = Date.now();
	setInterval(function(){
		var now = Date.now()
		var deltaMS = now - last;
		last = now;
		var speed = 3;
		///*
		var position = actor.transform.position;
		
		if(input.isKeyDown("W")) position.y += speed * deltaMS;
		if(input.isKeyDown("S")) position.y -= speed * deltaMS
		if(input.isKeyDown("A")) position.x -= speed * deltaMS;
		if(input.isKeyDown("D")) position.x += speed * deltaMS;
		actor.transform.position = position;//*/

		var position = camera.transform.position;
		if(input.isKeyDown("I")) position.y += speed * deltaMS;
		if(input.isKeyDown("K")) position.y -= speed * deltaMS
		if(input.isKeyDown("J")) position.x -= speed * deltaMS;
		if(input.isKeyDown("L")) position.x += speed * deltaMS;
		camera.transform.position = position;

		renderer.clear();
		renderer.render(scene, camera);
	}, 17)
	
}, 300);



