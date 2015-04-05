export default class Actor {//base class

	constructor(transform) {
		this.components = {};
		this.transform = transform;
	}

	addComponent(component) {
		this.components[component.constructor.name] = component;
	}

	getComponent(componentName) {
		return this.componenents[componentName]
	}
}