import vec2 from "./math/vec2"
import Commando from "./Commando"
//entry point for nodejs application. 
export var main = function (io) {

	var players = [
		new Commando(new vec2(0,0), 0),
		new Commando(new vec2(100,0), 0),
		new Commando(new vec2(-100,0), 0)
	]

	var nextId = 0;
	io.sockets.on("connection", function (socket) {
		socket.gameId = nextId++;
		var packet = [];
		for(let player of players){
			packet.push({
				position : player.position,
				rotation : player.rotation
			})
		}
		socket.emit("hello_riccardo", packet);

		socket.on("set_waypoint", function (waypoint) {
			players[socket.gameId].waypoint = waypoint;
		})
	})
	//temp update broadcast for testing. not real method
	var last = new Date().getTime();
	setInterval(function(){
		var now = new Date().getTime();
		var deltaTime = now - last;
		last = now;

		var packet = [];
		for(let player of players){
			player.update(deltaTime)
			packet.push({
				position : player.position,
				rotation : player.rotation
			})
		}

		io.sockets.emit("test_update", packet);
	})
	console.log("running!");

}


