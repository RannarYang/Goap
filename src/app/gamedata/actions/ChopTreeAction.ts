/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:12 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:12 
 */
class ChopTreeAction extends GoapAction{
	private chopped: boolean = false;
	private targetTree: TreeComponent; // where we get the logs from

	private startTime: number = 0;
	private workDuration: number = 2; // seconds
	public constructor() {
		super();
		this.addPrecondition("hasTool", true); // we need a tool to do this
		this.addPrecondition("hasLogs", false); // if we have logs we don't want more
		this.addEffect("hasLogs", true);
	}
	public reset(): void {
		this.chopped = false;
		this.targetTree = null;
		this.startTime = 0;
	}

	public isDone() {
		return this.chopped;
	}

	public requiresInRange() {
		return true;
	}
	public checkProceduralPrecondition (agent: VGameObject): boolean {
		// TODO:find the nearest tree that we can chop
		let trees :TreeComponent[] = [];
		let closest: TreeComponent = null;
		let closestDist: number = 0;
		
		for (let tree of trees) {
			if (closest == null) {
				// first one, so choose it for now
				closest = tree;
				closestDist = tree.distanceSquare(agent);
			} else {
				// is this one closer than the last?
				let dist: number = tree.distanceSquare(agent);
				if (dist < closestDist) {
					// we found a closer one, use it
					closest = tree;
					closestDist = dist;
				}
			}
		}
		if (closest == null)
			return false;

		this.targetTree = closest;
		this.target = this.targetTree;
		
		return closest != null;
	}
	
	public perform (iGoap: IGoap): boolean {
		let labourer = iGoap as Labourer;
		if (this.startTime == 0)
			this.startTime = egret.getTimer();
		
		if (egret.getTimer() - this.startTime > this.workDuration) {
			// finished chopping
			let backpack: BackPackComponent = labourer.backpack;;
			backpack.numLogs += 1;
			this.chopped = true;
			let tool: ToolComponent = backpack.tool;
			tool.use(0.34);
			if (tool.destroyed()) {
				// TODO: Destroy(backpack.tool);
				backpack.tool = null;
			}
		}
		return true;
	}
}