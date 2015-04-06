import mat3 from "./math/mat3"
import vec2 from "./math/vec2"
import Transform from "./Transform"

export default class Camera {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.ortho = mat3.createScaling(1/width, 1/height);
		this.transform = new Transform(new vec2(0,0), 0);
	}
}

/*
/implement this as camera.screenToWorld althought it would need a relative position to go of of.HNMMMMMMMMMMM.
	var x = e.pageX + camera.position.x - renderer.domElement.width/2;
	var y = (renderer.domElement.height - e.pageY) - renderer.domElement.height/2 + camera.position.y//I know redundant
	//console.log(x, y);
	//socket.emit("set_waypoint", {x:x,y:y});
})*/