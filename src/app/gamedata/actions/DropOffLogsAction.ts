/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:08:59 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:10:15
 */
class DropOffLogsAction extends GoapAction{
	private droppedOffLogs: boolean = false;
	private targetSupplyPile: SupplyPileComponent; // where we drop off the logs
	public constructor() {
		super();
		this.addPrecondition ("hasLogs", true); // can't drop off logs if we don't already have some
		this.addEffect ("hasLogs", false); // we now have no logs
		this.addEffect ("collectLogs", true); // we collected logs
	}

	public reset() {
		this.droppedOffLogs = false;
		this.targetSupplyPile = null;
	}

	public isDone(): boolean {
		return this.droppedOffLogs;
	}

	public requiresInRange(): boolean {
		return true;
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean {
		// TODO:find the nearest supply pile
		let supplyPiles: SupplyPileComponent[] = [];
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

		this.targetSupplyPile = closest;
		this.target = this.targetSupplyPile;
		
		return closest != null;
	}
	
	public perform (labourer: Labourer): boolean{
		let backpack: BackPackComponent = labourer.backpack;
		this.targetSupplyPile.numLogs += backpack.numLogs;
		this.droppedOffLogs = true;
		backpack.numLogs = 0;
		
		return true;
	}
}