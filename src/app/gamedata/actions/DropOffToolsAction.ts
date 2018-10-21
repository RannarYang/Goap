/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:11:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:12:07
 */
class DropOffToolsAction extends GoapAction {
	private droppedOffTools: boolean = false;
	private targetSupplyPile: SupplyPileComponent; // where we drop off the  tools
	public constructor() {
		super();
		this.addPrecondition ("hasNewTools", true); // can't drop off tools if we don't already have some
		this.addEffect ("hasNewTools", false); // we now have no tools
		this.addEffect ("collectTools", true); // we collected tools
	}

	public reset(): void {
		this.droppedOffTools = false;
		this.targetSupplyPile = null;
	}

	public isDone() {
		return this.droppedOffTools;
	}

	public requiresInRange() {
		return true; // yes we need to be near a supply pile so we can drop off the tools
	}

	public checkProceduralPrecondition (agent: VGameObject): boolean {
		//TODO: find the nearest supply pile that has spare tools
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
	
	public perform (labourer: Labourer): boolean {
		this.targetSupplyPile.numTools += 2;
		this.droppedOffTools = true;
		//TODO play effect, change actor icon
		
		return true;
	}
}