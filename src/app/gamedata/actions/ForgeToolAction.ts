/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:12:33 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-28 11:36:06
 */
class ForgeToolAction extends GoapAction{
	private forged: boolean = false;
	public target: ForgeComponent; // where we forge tools

	private startTime: number = 0;
	private forgeDuration: number = 2; // seconds
	public constructor() {
		super();
		this.addPrecondition (ActionStatus.HasOre, true);
		this.addEffect (ActionStatus.HasNewTools, true);
	}

	public reset() {
		this.forged = false;
		this.startTime = 0;
	}

	public isDone(): boolean {
		return this.forged;
	}
	public requiresInRange(): boolean {
		return true;
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean {
		//TODO: find the nearest forge
		let forges: ForgeComponent[] = Environment.forgeComps;
		let closest: ForgeComponent = null;
		let closestDist: number = 0;
		
		for (let forge of forges) {
			if (closest == null) {
				// first one, so choose it for now
				closest = forge;
				closestDist = forge.distanceSquare(agent);
			} else {
				// is this one closer than the last?
				let dist: number = forge.distanceSquare(agent);
				if (dist < closestDist) {
					// we found a closer one, use it
					closest = forge;
					closestDist = dist;
				}
			}
		}
		if (closest == null)
			return false;

		this.target = closest;
		
		return closest != null;
	}
	
	public perform (labourer: Labourer): boolean {
		if (this.startTime == 0)
			this.startTime = egret.getTimer();
		
		if (egret.getTimer() - this.startTime > this.forgeDuration) {
			// finished forging a tool
			let backpack: BackPackComponent = labourer.backpack;
			backpack.numOre = 0;
			this.forged = true;
		}
		return true;
	}
}