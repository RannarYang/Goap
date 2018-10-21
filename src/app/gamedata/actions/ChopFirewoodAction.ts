/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:09 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:09 
 */
class ChopFirewoodAction extends GoapAction{
	private chopped: boolean = false;
	/**where we chop the firewood */
	private targetChoppingBlock: ChoppingBlockComponent;
	
	private startTime: number = 0;
	public workDuration: number = 2;
	public constructor() {
		super();
		this.addPrecondition("hasTool", true); // we need a tool to do this
		this.addPrecondition("hasFirewood", false); // if we have firewood we don't want more
		this.addEffect("hasFirewood", true);
	}
	public reset() {
		this.chopped = false;
		this.targetChoppingBlock = null;
		this.startTime = 0;
	}
	public isDone() {
		return this.chopped;
	}

	public requiresInRange() {
		return true;
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean {
		// TODO:find the nearest chopping block that we can chop our wood at
		let blocks: ChoppingBlockComponent[] = [];
		let closest: ChoppingBlockComponent = null;
		let closestDist: number = 0;
		
		for(let block of blocks) {
			if(closest == null) {
				closest = block;
				closestDist = block.distanceSquare(agent);
			} else {
				// is this one closer than the last?
				let dist: number = block.distanceSquare(agent);
				if (dist < closestDist) {
					// we found a closer one, use it
					closest = block;
					closestDist = dist;
				}
			}
		}

		if (closest == null)
			return false;

		this.targetChoppingBlock = closest;
		this.target = this.targetChoppingBlock;
		
		return closest != null;
	}
	
	public perform(iGoap: IGoap): boolean {
		let labourer = iGoap as Labourer;
		if (this.startTime == 0)
			this.startTime = egret.getTimer();
		
		if (egret.getTimer() - this.startTime > this.workDuration) {
			// finished chopping
			let backpack: BackPackComponent = labourer.backpack;
			backpack.numFirewood += 5;
			this.chopped = true;
			let tool = backpack.tool;
			tool.use(0.34);
			if (tool.destroyed()) {
				// TODO:删除 Destroy(backpack.tool);
				backpack.tool = null;
			}
		}
		return true;
	}
}