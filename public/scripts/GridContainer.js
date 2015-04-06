export default class ObjectContainer {
	constructor(transform, blockSize) {
		this.blockSize = blockSize;
		this.renderType = "ObjectContainer";
		this.transform = transform;
		this.children = {};
		this.zIndex = 0;
	}

	getChildren(matrix, camera) {//for now, assume its always a base container. @TODO
		var blockSize = this.blockSize;
		var blockWidth = camera.width * 2/ blockSize;
		var blockHeight = camera.height  * 2/ blockSize;
		var blockPosition = camera.transform.position.scale(1/blockSize);
		var left = Math.floor(blockPosition.x - blockWidth/2) -1, right = left+ blockWidth + 2;
		var bottom = Math.floor(blockPosition.y - blockHeight/2)-1, top = bottom + blockHeight + 3;
		var children = this.children;
		var out = [];
		for(var y = bottom;y <=top;y++){
			for(var x = left;x <= right;x++){
				var child = children[x + ":" + y];
				if(child !== undefined) out.push(child);
			}
		}
		return out;
	}

	addChild(x, y, child) {
		this.children[x + ":" + y] = child;
	}
}