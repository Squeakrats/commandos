import vec2 from "./math/vec2";
import mat3 from "./math/mat3";
//import Sprite from "./Sprite";
import Camera from "./Camera";
import Renderer from "./Renderer"
import Scene from "./Scene"
import Actor from "./Actor"
import SpriteComponent from "./SpriteComponent"
import {createTextureFromUrl} from "./glutil"

var buildPlayer = function (position, rotation) {
	var actor = new Actor(position, rotation);
	actor.addComponent(new SpriteComponent(actor, 64, 64, "player1"))
	return actor;
}

var players = []
var socket = io()

	socket.on("hello_riccardo", function (data) {
		for(let state of data) {
			var actor = buildPlayer(state.position, state.rotation);
			scene.addChild(actor.components.SpriteComponent);
			players.push(actor);
		}
	})
	socket.on("test_update", function (data) {
		for(var i = 0; i < data.length;i++){
			var state = data[i];
			players[i].position.copy(state.position);
			players[i].rotation = state.rotation;
		}
	})

var renderer = new Renderer(800, 500);
renderer.textures["player1"] = createTextureFromUrl(renderer.gl, "assets/player1.png");
var scene = new Scene();
var camera = new Camera(800/2, 500/2);
document.body.appendChild(renderer.domElement);


setInterval(function(){
	renderer.render(scene, camera)
}, 17)


addEventListener("mousedown", function (e) {
	//implement this as camera.screenToWorld
	var x = e.pageX + camera.position.x - renderer.domElement.width/2;
	var y = (renderer.domElement.height - e.pageY) - renderer.domElement.height/2 + camera.position.y//I know redundant
	console.log(x, y);
	socket.emit("set_waypoint", {x:x,y:y});
})