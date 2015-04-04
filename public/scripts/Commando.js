import Actor from "./Actor"
import vec2 from "./math/vec2"

export default class Commando extends Actor{
	constructor(position, rotation) {
		super(position, rotation);
		this.waypoint = null;
		this.walkspeed = 2;
	}

	update(deltaTime){
		if(this.waypoint == null) return;
		var dif = vec2.sub(this.waypoint, this.position)
		var dis = dif.len();
		if(dis < this.walkspeed * deltaTime) {
			this.position.copy(this.waypoint);
			this.waypoint = null;
		}else{
			this.position.add(dif.scale((this.walkspeed * deltaTime)/dis));
		}
	}
}