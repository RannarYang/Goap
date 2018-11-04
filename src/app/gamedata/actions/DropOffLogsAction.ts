/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:08:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-10-28 11:34:06
 */
class DropOffLogsAction extends GoapAction{
	private droppedOffLogs: boolean = false;
	public target: SupplyPileComponent;
	public constructor() {
		super();
		this.addPrecondition (ActionStatus.HasLogs, true); // can't drop off logs if we don't already have some
		this.addEffect (ActionStatus.HasLogs, false); // we now have no logs
		this.addEffect (ActionStatus.CollectLogs, true); // we collected logs
	}

	public reset() {
		this.droppedOffLogs = false;
	}

	public isDone(): boolean {
		return this.droppedOffLogs;
	}

	public requiresInRange(): boolean {
		return true;
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean {
		// TODO:find the nearest supply pile
		let supplyPiles: SupplyPileComponent[] = Environment.supplyPileComps;
		let closest: SupplyPileComponent = null;
		let closestDist: number = 0;
		
		for (let supply of supplyPiles) {
			if (closest == null) {
				// first one, so choose it for now
				closest = supply;
				closestDist = supply.distanceSquare(agent);
			} else {
				// is this one closer than the last?
				let dist: number = supply.distanceSquare(agent);
				if (dist < closestDist) {
					// we found a closer one, use it
					closest = supply;
					closestDist = dist;
				}
			}
		}
		if (closest == null)
			return false;

		this.target = closest;
		
		return closest != null;
	}
	
	public perform (labourer: Labourer): boolean{
		let backpack: BackPackComponent = labourer.backpack;
		this.target.numLogs += backpack.numLogs;
		this.droppedOffLogs = true;
		backpack.numLogs = 0;
		
		return true;
	}
}