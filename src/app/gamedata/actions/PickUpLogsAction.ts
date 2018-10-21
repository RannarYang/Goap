/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:14:10 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:14:33
 */
class PickUpLogsAction extends GoapAction{
	private hasLogs: boolean = false;
	private targetSupplyPile: SupplyPileComponent;  // where we get the logs from
	public constructor() {
		super();
		this.addPrecondition ("hasLogs", false); // don't get a logs if we already have one
		this.addEffect ("hasLogs", true); // we now have a logs
	}

	public reset() {
		this.hasLogs = false;
		this.targetSupplyPile = null;
	}

	public isDone(): boolean {
		return this.hasLogs;
	}

	public requiresInRange(): boolean {
		return true;
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean {
		//TODO: find the nearest supply pile that has spare logs
		let supplyPiles: SupplyPileComponent[] = [];
		let closest: SupplyPileComponent = null;
		let closestDist: number = 0;
		
		for (let supply of supplyPiles) {
			if (supply.numLogs > 0) {
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
		}
		if (closest == null)
			return false;

		this.targetSupplyPile = closest;
		this.target = this.targetSupplyPile;
		
		return closest != null;
	}
	
	public perform (labourer: Labourer): boolean {
		if (this.targetSupplyPile.numLogs > 0) {
			this.targetSupplyPile.numLogs -= 1;
			this.hasLogs = true;
			//TODO play effect, change actor icon
			let backpack = labourer.backpack;
			backpack.numLogs = 1;
			
			return true;
		} else {
			// we got there but there was no logs available! Someone got there first. Cannot perform action
			return false;
		}
	}
}