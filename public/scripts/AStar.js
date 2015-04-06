export class AStarNode {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.isTraversable = true;

		this.isClosed = false;
		this.parent = null;
		this.H = null;
		this.G = null;
	}

	reset() {
		this.isClosed = false;
		this.parent = null;
		this.H = null;
		this.G = null;
	}
}

export class AStarGrid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.grid = [];
		this.nodes = [];

		for(var y = 0; y < height;y++){
			var row = this.grid[y] = [];
			for(var x = 0; x < width;x++){
				var node = new AStarNode(x, y);
				row[x] = node;
				this.nodes.push(node);
			}
		}
	}

	cost (a, b) {
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
	}

	adjacent(node) {
		var grid = this.grid, x = node.x, y = node.y;
		var nodes = [];
		if(x > 0) nodes.push(grid[y][x-1]);
		if(x < this.width - 2) nodes.push(grid[y][x+1])
		if(y > 0) nodes.push(grid[y-1][x]);
		if(y < this.width - 2) nodes.push(grid[y+2][x])
		return nodes;
	}

	search(start, end) {
		for(let node of this.nodes){
			node.reset();
			node.H = this.cost(node, end);
		}

		start.H = 0;
		start.G = 0;

		var open = [start], path = [];
		while(open.length){

			open.sort((a, b) => { return (a.G + a.H) - (b.G + b.H) })

			var curr = open.shift();

			if(curr === end){
				var c = end;
				while(c.parent){
					path.push(c);
					c = c.parent;
				}
				
				console.log(path.reverse())
				break;
			}

			curr.isClosed = true;
			for(let node of this.adjacent(curr)){
				var grade = curr.G+ 1;
				if(node.G == null){
					node.G = grade;
					node.parent = curr;
					open.push(node);
				}else if(grade < node.G){
					node.parent = curr;
					node.G = grade;
				}
			}

		}

		//console.log(this.grid)


	}
}