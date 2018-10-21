/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:13:23 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:13:50
 */
class MineOreAction extends GoapAction{
	private mined: boolean = false;
	private targetRock: IronRockComponent; // where we get the ore from

	private startTime: number = 0;
	private miningDuration: number = 2; // seconds;

	public constructor() {
		super();
		this.addPrecondition ("hasTool", true); // we need a tool to do this
		this.addPrecondition ("hasOre", false); // if we have ore we don't want more
		this.addEffect ("hasOre", true);
	}

	public reset(): void {
		this.mined = false;
		this.targetRock = null;
		this.startTime = 0;
	}

	public isDone() : boolean {
		return this.mined;
	}

	public requiresInRange(): boolean {
		return true; // yes we need to be near a rock
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean{
		//TODO: find the nearest rock that we can mine
		let rocks: IronRockComponent[] = [];
		let closest: IronRockComponent = null;
		let closestDist: number = 0;
		
		for (let rock of rocks) {
			if (closest == null) {
				// first one, so choose it for now
				closest = rock;
				closestDist = rock.distanceSquare(agent);
			} else {
				// is this one closer than the last?
				let dist: number = rock.distanceSquare(agent);
				if (dist < closestDist) {
					// we found a closer one, use it
					closest = rock;
					closestDist = dist;
				}
			}
		}
		this.targetRock = closest;
		this.target = this.targetRock;
		
		return closest != null;
	}
	
	public perform (labourer: Labourer): boolean{
		if (this.startTime == 0)
			this.startTime = egret.getTimer();

		if (egret.getTimer() - this.startTime > this.miningDuration) {
			// finished mining
			let backpack: BackPackComponent = labourer.backpack;;
			backpack.numOre += 2;
			this.mined = true;
			let tool: ToolComponent = backpack.tool;
			tool.use(0.5);
			if (tool.destroyed()) {
				//TODO:删除 Destroy(backpack.tool);
				backpack.tool = null;
			}
		}
		return true;
	}
}