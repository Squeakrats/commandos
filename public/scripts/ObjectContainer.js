export default class ObjectContainer {
	constructor(transform) {
		this.renderType = "ObjectContainer";
		this.transform = transform;
		this.children = [];
		this.zIndex = 0;
	}

	getChildren(camera) {
		return this.children;
	}

	addChild(child) {
		this.children.push(child);
	}
}