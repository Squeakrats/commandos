export default class Scene {
	constructor() {
		this.children = [];
	}

	addChild(child) {
		this.children.push(child);
	}
}