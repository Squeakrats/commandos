import vec2 from "./math/vec2";
import mat3 from "./math/mat3";
//import Sprite from "./Sprite";
import Camera from "./Camera";
import Renderer from "./Renderer"
import Scene from "./Scene"
import Actor from "./Actor"
import Commando from "./Commando"
import SpriteComponent from "./SpriteComponent"
import {createTextureFromUrl} from "./glutil"
import Transform from "./Transform"
import {loadFile, loadJSON} from "./util"
import Texture from "./Texture";



var buildPlayer = function (position, rotation) {
	var actor = new Commando( new Transform(new vec2(0,0), 0) );
	actor.addComponent(new SpriteComponent(actor, 64, 64, "player1"))
	return actor;
}

var actor = buildPlayer(new vec2(0,0), 0);
var keys = {};

var renderer = new Renderer(800, 500)
var scene = new Scene();

Texture.loadAtlas("assets/player1.png").then((textures)=>{
	renderer.addTextures(textures);
})

scene.addChild(actor.components.SpriteComponent)
var camera = new Camera(800/2, 500/2);
document.body.appendChild(renderer.domElement);
var last = Date.now();
var inter = setInterval(function(){
//	/*
	var now = Date.now();
	var deltaMS = now - last;
	last = now;
	var walkSpeed = 2
	var position = actor.transform.position;
	if(keys[87]) position.y += walkSpeed * deltaMS;
	if(keys[83]) position.y -= walkSpeed * deltaMS;
	if(keys[65]) position.x -= walkSpeed * deltaMS;
	if(keys[68]) position.x += walkSpeed * deltaMS;
	actor.transform.position = position;


	renderer.render(scene, camera)//*/
	//clearInterval(inter)
}, 17)



addEventListener("keydown", function(e) {
	keys[e.keyCode] = true;
})

addEventListener("keyup", function(e) {
	delete keys[e.keyCode];
})

/*
addEventListener("mousedown", function (e) {
	//implement this as camera.screenToWorld
	var x = e.pageX + camera.position.x - renderer.domElement.width/2;
	var y = (renderer.domElement.height - e.pageY) - renderer.domElement.height/2 + camera.position.y//I know redundant
	//console.log(x, y);
	//socket.emit("set_waypoint", {x:x,y:y});
})*/