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
/*
implement a map loader 
implement view culling via grid container
implement z-index. !!Important 
create or find a texture atlas so I can start baking textures together in batches. 
look up full promize spec. I think im doing it wrong (too much nesting)

*/
var container = new ObjectContainer(new Transform(new vec2(0,0), 0));
var buildPlayer = function (position, rotation) {
	var actor = new Commando( new Transform (new vec2(0,0), 0));
	actor.addComponent(new Sprite(actor.transform, 64, 64, "player1"));
	return actor;
}


//init renderer
var renderer = new Renderer(800, 500);
document.body.appendChild(renderer.domElement);

Texture.loadAtlas("assets/player1.png").then((textures)=>{
	renderer.addTextures(textures);
})

//create world
var camera = new Camera(800/2, 500/2);
var scene = new Scene();
var input = new Input();

var actor = buildPlayer(new vec2(0,0), 0);
scene.addChild(container);
scene.addChild(actor.components.Sprite)







setTimeout(function(){
	var last = Date.now();
	setInterval(function(){
		var now = Date.now()
		var deltaMS = now - last;
		last = now;
		var position = actor.transform.position;
		var speed = 3;
		if(input.isKeyDown("W")) position.y += speed * deltaMS;
		if(input.isKeyDown("S")) position.y -= speed * deltaMS
		if(input.isKeyDown("A")) position.x -= speed * deltaMS;
		if(input.isKeyDown("D")) position.x += speed * deltaMS;
		actor.transform.position = position;

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



