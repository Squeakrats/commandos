import {createTextureFromImage} from "./glutil"
export default class Scene {//oh well to rendering on 2 canvases

	constructor() {
		this.children = [];
	}

	addChild(child) {
		this.children.push(child);
	}

	
}